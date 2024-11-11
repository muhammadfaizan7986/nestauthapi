import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserDocument } from "src/modules/user/entities/user.entity";
import { SignInInput } from "./dto/create-auth.dto";
import { SignOutResult } from "./dto/update-auth.dto";
import { jwtConstants } from "src/constants/jwt.constant";
import { UserService } from "../user/user.service";
import { VerificationService } from "../verification/verification.service";
import { verificationTypes } from "src/constants/auth";
import { generateRandomNumber } from "src/utils/common.helpers";
import { Model, Types } from "mongoose";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";
import { DB_COLLECTIONS } from "src/constants/collections";
import { InjectModel } from "@nestjs/mongoose";
import { EXPIRATION_TIME_MS } from "../verification/verification.constants";
import { EmailQueueService } from "src/queue/email/email.queue.service";
import {
  EMAIL_OTP_INTERFACE,
  FORGET_PASSWORD_INTERFACE,
} from "src/queue/email/email.interface";
import axios from "axios";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(DB_COLLECTIONS.USERS) private userModel: Model<UserDocument>,
    private readonly emailQueueService: EmailQueueService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly verificationService: VerificationService
  ) {}

  async createJwt(
    u: UserDocument
  ): Promise<{ user: UserDocument; access_token: string }> {
    const user = {
      email: u.email,
      isVerified: u.isVerified,
      fullName: u.fullName,
      _id: u._id,
    };

    const jwt = await this.jwtService.signAsync(user, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expire,
    });
    const payload = {
      ...u.toJSON(),
    };

    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: payload,
      access_token: jwt,
    };
  }

  async validateToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      return decoded;
    } catch (error) {
      // If the token is invalid or expired, return null.
      return null;
    }
  }

  async signup(body: SignInInput): Promise<SignOutResult> {
    const isAlreadyUser = await this.userService.findOne({ email: body.email });

    if (isAlreadyUser) {
      throw new ConflictException("User is already registered. Please log in.");
    }

    if (body.password !== body.confirmPassword) {
      throw new BadRequestException(
        "Password and confirm password do not match."
      );
    }

    if (!body.terms) {
      throw new BadRequestException(
        "Please accept the Terms of Service and Privacy Policy to proceed."
      );
    }

    const createdUser = await this.userService.create(body);

    const code = generateRandomNumber();

    await this.verificationService.createCode(
      code,
      createdUser._id,
      verificationTypes.VERIFY_EMAIL
    );

    const otpEmailData: EMAIL_OTP_INTERFACE = {
      email: createdUser.email,
      otp: code.toString(),
      fullname: createdUser.fullName,
    };

    await this.emailQueueService.otpEmail(otpEmailData);

    /* await this.emailService.sendVerifyEmail(
      createdUser.email,
      code,
      createdUser.fullName,
    ); */

    return this.createJwt(createdUser);
  }

  async login(loginDto: LoginDto): Promise<SignOutResult> {
    const userToAttempt: UserDocument | undefined =
      await this.userService.findOne({
        email: {
          $regex: `^${loginDto.email}$`,
          $options: "i",
        },
      });

    if (!userToAttempt) {
      throw new HttpException(
        {
          success: false,
          message: "Incorrect email or password",
          isVerified: false,
          status: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED
      );
    }

    /* if (userToAttempt.loginType == 'yahoo') {
      throw new HttpException(
        {
          success: false,
          message:
            'This email is already linked with Yahoo. Please log in using Yahoo.',
          status: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    } */

    // If user is not verified, throw BadRequestException with `isVerified: false`
    if (!userToAttempt.isVerified) {
      const code = generateRandomNumber();

      await this.verificationService.createCode(
        code,
        userToAttempt._id,
        verificationTypes.VERIFY_EMAIL
      );

      const otpEmailData: EMAIL_OTP_INTERFACE = {
        email: userToAttempt.email,
        otp: code.toString(),
        fullname: userToAttempt.fullName,
      };

      await this.emailQueueService.otpEmail(otpEmailData);

      const userRes = {
        success: false,
        message: "User is not verified. Please verify your account.",
        user: {
          isVerified: false,
          email: userToAttempt?.email,
        },
      };
      return userRes;
    }

    const isMatch = await userToAttempt.checkPassword(loginDto.password);

    if (isMatch) {
      return await this.createJwt(userToAttempt);
    } else {
      throw new UnauthorizedException({
        success: false,
        message: "Incorrect email or password",
        status: HttpStatus.UNAUTHORIZED,
      });
    }
  }

  async sendPasswordResetEmail(email: string) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new HttpException(
        "Incorrect email, please enter the correct email",
        HttpStatus.UNAUTHORIZED
      );
    }
    const verification = await this.verificationService.findOne({
      userId: user._id,
      type: verificationTypes.FORGOT_PASSWORD,
    });

    if (verification) {
      const currentTime = new Date().getTime();
      const twoMinutes = EXPIRATION_TIME_MS; // 2 minutes in milliseconds
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

      // Check if 2 minutes have passed since the last email was sent
      if (
        currentTime <
        new Date(verification.updatedAt).getTime() + twoMinutes
      ) {
        throw new HttpException(
          "Email already sent, kindly retry after 2 minutes.",
          HttpStatus.BAD_REQUEST
        );
      }

      // Check if the user has made more than 3 attempts and it's still within 1 hour
      if (
        verification.attempts > 2 &&
        currentTime < new Date(verification.updatedAt).getTime() + oneHour
      ) {
        throw new HttpException(
          "You have already made 3 attempts. Please retry after 1 hour.",
          HttpStatus.TOO_MANY_REQUESTS
        );
      }
    }

    const code = generateRandomNumber();
    this.verificationService.createCode(
      code,
      user._id,
      verificationTypes.FORGOT_PASSWORD
    );

    const otpEmailData: EMAIL_OTP_INTERFACE = {
      email: user.email,
      otp: code.toString(),
      fullname: user.fullName,
    };

    await this.emailQueueService.otpEmail(otpEmailData);

    //await this.emailService.sendForgotPasswordEmail(email, code, user.fullName);

    return {
      message: "OTP sent to your email",
    };
  }

  async resendVerificationEmail(email: string) {
    const MAX_ATTEMPTS = 3;
    const RETRY_AFTER_HOURS_MS = 1 * 60 * 60 * 1000;

    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new HttpException(
        "Incorrect email, please enter the correct email",
        HttpStatus.UNAUTHORIZED
      );
    }

    const verification = await this.verificationService.findOne({
      userId: user._id,
      type: verificationTypes.VERIFY_EMAIL,
    });

    const currentTime = Date.now();

    if (verification) {
      const timeSinceLastUpdate =
        currentTime - new Date(verification.updatedAt).getTime();

      if (timeSinceLastUpdate < EXPIRATION_TIME_MS) {
        throw new HttpException(
          "Email already sent, kindly retry after 2 minutes.",
          HttpStatus.BAD_REQUEST
        );
      }

      if (
        verification.attempts >= MAX_ATTEMPTS &&
        timeSinceLastUpdate < RETRY_AFTER_HOURS_MS
      ) {
        throw new HttpException(
          "You have already made 3 attempts. Please retry after one hour.",
          HttpStatus.TOO_MANY_REQUESTS
        );
      }
    }

    const newCode = generateRandomNumber();

    if (verification) {
      verification.code = newCode.toString();
      verification.attempts += 1;

      await verification.save();
    } else {
      await this.verificationService.createCode(
        newCode,
        user._id,
        verificationTypes.VERIFY_EMAIL
      );
    }

    const otpEmailData: EMAIL_OTP_INTERFACE = {
      email: user.email,
      otp: newCode.toString(),
      fullname: user.fullName,
    };

    await this.emailQueueService.otpEmail(otpEmailData);

    return {
      message: "OTP sent to your email",
    };
  }

  async resetPassword(body: ResetPasswordDto) {
    const { email, code, password, confirmPassword } = body;

    if (password !== confirmPassword) {
      throw new BadRequestException(
        "Password and confirm password do not match."
      );
    }

    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new HttpException(
        "Incorrect email, please enter the correct email",
        HttpStatus.UNAUTHORIZED
      );
    }

    const verification = await this.verificationService.findOne({
      userId: user._id,
      type: verificationTypes.FORGOT_PASSWORD,
    });

    if (!verification) {
      throw new HttpException(
        "Verification record not found",
        HttpStatus.NOT_FOUND
      );
    }

    const currentTime = Date.now();

    if (currentTime > verification.expiry) {
      throw new BadRequestException(
        "Verification code has expired. Please request a new one."
      );
    }

    if (verification.attempts >= 3) {
      throw new BadRequestException(
        "You have already made 3 attempts, please retry after 24 hours"
      );
    }

    if (verification.code === code) {
      const hashedPassword = bcrypt.hashSync(password, jwtConstants.salt);

      await this.userService.userModel.findOneAndUpdate(user._id, {
        password: hashedPassword,
        key: user._id + code + user._id,
      });

      await this.verificationService.create({
        type: "SYSTEM",
        userId: user._id as Types.ObjectId,
        code,
        isVerified: false,
        expiry: new Date().getTime() + 1000 * 60 * 30,
        attempts: 0,
      });

      const passwordResetData: FORGET_PASSWORD_INTERFACE = {
        email: user.email,
        fullname: user.fullName,
      };
      this.emailQueueService.passwordResetSuccess(passwordResetData);

      return { message: "Password reset successfully" };
    } else {
      verification.attempts += 1;
      await verification.save();
      throw new BadRequestException("Incorrect pin entered");
    }
  }

  async verifyEmail(body: { email: string; code: string }) {
    const { email, code } = body;

    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new HttpException(
        "Incorrect email, please enter the correct email",
        HttpStatus.UNAUTHORIZED
      );
    }

    const verification = await this.verificationService.findOne({
      userId: user._id,
      type: verificationTypes.VERIFY_EMAIL,
    });

    if (!verification) {
      throw new NotFoundException("No verification record found for this user");
    }

    const currentTime = new Date().getTime();

    /* if (currentTime > verification.expiry) {
      throw new BadRequestException(
        'Verification code has expired. Please request a new one.',
      );
    } */

    if (verification.attempts >= 3) {
      const oneHourInMs = 60 * 60 * 1000;
      const timeSinceLastAttempt =
        currentTime - new Date(verification.updatedAt).getTime();

      if (timeSinceLastAttempt < oneHourInMs) {
        throw new BadRequestException(
          "You have already made 3 attempts. Please retry after one hour."
        );
      } else {
        verification.attempts = 0;
      }
    }

    if (verification.code === code) {
      await this.verificationService.findOneAndUpdate(
        { _id: verification._id.toString() },
        { isVerified: true, attempts: 0 },
        { new: true }
      );

      user.isVerified = true;
      await user.save();

      const access_token_payload = await this.createJwt(user);

      return {
        success: true,
        isVerified: user.isVerified,
        token: access_token_payload.access_token,
      };
    } else {
      verification.attempts += 1;
      await verification.save();
      throw new BadRequestException("Invalid verification code");
    }
  }

  // async findOrCreateUser(
  //   profile: any,
  //   accessToken: string,
  //   refreshToken: string,
  // ): Promise<UserDocument> {
  //   try {
  //     console.log('Access Token:', refreshToken);
  //     console.log('Access Token:', accessToken);
  //     console.log('Profile data:', profile);

  //     let user = await this.userService.findOne({ email: profile.email });

  //     if (!user) {
  //       console.log('User not found, creating a new user');

  //       user = new this.userModel({
  //         yahooId: profile.sub,
  //         fullName: profile.name,
  //         email: profile.email,
  //         yahooAccessToken: accessToken,
  //         isVerified: profile.email_verified,
  //         profileImage: profile.picture,
  //         refreshToken: refreshToken,
  //         loginType: 'yahoo',
  //       });
  //       await user.save();
  //       console.log('New user created:', user);
  //     } else {
  //       console.log('User found, updating access token');

  //       user.yahooAccessToken = accessToken;
  //       user.refreshToken = refreshToken;
  //       user.fullName = profile.name;
  //       user.email = profile.email;
  //       user.profileImage = profile.picture;
  //       user.loginType = user.loginType ? user.loginType : 'yahoo';
  //       await user.save();
  //       console.log('User access token updated:', user);
  //     }
  //     return user;
  //   } catch (error) {
  //     console.error('Error in findOrCreateUser:', error);
  //     throw new Error('Failed to find or create user');
  //   }
  // }

  extractTokenFromHeader(request: any): string | undefined {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) return undefined;

    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") return undefined;

    return token.trim();
  }

  async getYahooAccessToken(
    accessToken: any,
    refreshToken: any,
    expiresAt: number
  ) {
    // Function to retrieve the stored access token and refresh token
    // const { accessToken, refreshToken, expiresAt } = await getStoredTokens();

    // Check if the access token is expired
    const currentTime = Date.now();
    if (currentTime >= expiresAt) {
      console.log("Access token expired, refreshing...");

      // Refresh the access token using the refresh token
      const newTokens = await this.refreshYahooToken(refreshToken);

      // Store the new tokens (you may need to adapt this to your storage method)
      await this.storeTokens(newTokens);

      return newTokens.accessToken;
    }

    return accessToken; // Return the existing valid access token
  }

  async refreshYahooToken(refreshToken: any) {
    const clientId = process.env.YAHOO_CLIENT_ID; // Your Yahoo client ID
    const clientSecret = process.env.YAHOO_CLIENT_SECRET; // Your Yahoo client secret
    const tokenUrl = "https://api.login.yahoo.com/oauth2/get_token";

    const response = await axios.post(tokenUrl, null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresAt: Date.now() + response.data.expires_in * 1000, // Token expiry time
    };
  }

  async getStoredTokens() {
    // Implement your logic to retrieve the stored access and refresh tokens
    // For example, it can be from a database or environment variables
  }

  async storeTokens(tokens) {
    console.log(tokens, "tokens");

    // Implement your logic to store the new access and refresh tokens
    // For example, it can be saving to a database or environment variables
  }
}
