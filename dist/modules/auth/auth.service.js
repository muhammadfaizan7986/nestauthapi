"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_constant_1 = require("../../constants/jwt.constant");
const user_service_1 = require("../user/user.service");
const verification_service_1 = require("../verification/verification.service");
const auth_1 = require("../../constants/auth");
const common_helpers_1 = require("../../utils/common.helpers");
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const collections_1 = require("../../constants/collections");
const mongoose_2 = require("@nestjs/mongoose");
const verification_constants_1 = require("../verification/verification.constants");
const email_queue_service_1 = require("../../queue/email/email.queue.service");
const axios_1 = require("axios");
let AuthService = class AuthService {
    constructor(userModel, emailQueueService, userService, jwtService, verificationService) {
        this.userModel = userModel;
        this.emailQueueService = emailQueueService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.verificationService = verificationService;
    }
    async createJwt(u) {
        const user = {
            email: u.email,
            isVerified: u.isVerified,
            fullName: u.fullName,
            _id: u._id,
        };
        const jwt = await this.jwtService.signAsync(user, {
            secret: jwt_constant_1.jwtConstants.secret,
            expiresIn: jwt_constant_1.jwtConstants.expire,
        });
        const payload = {
            ...u.toJSON(),
        };
        return {
            user: payload,
            access_token: jwt,
        };
    }
    async validateToken(token) {
        try {
            const decoded = await this.jwtService.verifyAsync(token, {
                secret: jwt_constant_1.jwtConstants.secret,
            });
            return decoded;
        }
        catch (error) {
            return null;
        }
    }
    async signup(body) {
        const isAlreadyUser = await this.userService.findOne({ email: body.email });
        if (isAlreadyUser) {
            throw new common_1.ConflictException("User is already registered. Please log in.");
        }
        if (body.password !== body.confirmPassword) {
            throw new common_1.BadRequestException("Password and confirm password do not match.");
        }
        if (!body.terms) {
            throw new common_1.BadRequestException("Please accept the Terms of Service and Privacy Policy to proceed.");
        }
        const createdUser = await this.userService.create(body);
        const code = (0, common_helpers_1.generateRandomNumber)();
        await this.verificationService.createCode(code, createdUser._id, auth_1.verificationTypes.VERIFY_EMAIL);
        const otpEmailData = {
            email: createdUser.email,
            otp: code.toString(),
            fullname: createdUser.fullName,
        };
        await this.emailQueueService.otpEmail(otpEmailData);
        return this.createJwt(createdUser);
    }
    async login(loginDto) {
        const userToAttempt = await this.userService.findOne({
            email: {
                $regex: `^${loginDto.email}$`,
                $options: "i",
            },
        });
        if (!userToAttempt) {
            throw new common_1.HttpException({
                success: false,
                message: "Incorrect email or password",
                isVerified: false,
                status: common_1.HttpStatus.UNAUTHORIZED,
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!userToAttempt.isVerified) {
            const code = (0, common_helpers_1.generateRandomNumber)();
            await this.verificationService.createCode(code, userToAttempt._id, auth_1.verificationTypes.VERIFY_EMAIL);
            const otpEmailData = {
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
        }
        else {
            throw new common_1.UnauthorizedException({
                success: false,
                message: "Incorrect email or password",
                status: common_1.HttpStatus.UNAUTHORIZED,
            });
        }
    }
    async sendPasswordResetEmail(email) {
        const user = await this.userService.findOne({ email });
        if (!user) {
            throw new common_1.HttpException("Incorrect email, please enter the correct email", common_1.HttpStatus.UNAUTHORIZED);
        }
        const verification = await this.verificationService.findOne({
            userId: user._id,
            type: auth_1.verificationTypes.FORGOT_PASSWORD,
        });
        if (verification) {
            const currentTime = new Date().getTime();
            const twoMinutes = verification_constants_1.EXPIRATION_TIME_MS;
            const oneHour = 60 * 60 * 1000;
            if (currentTime <
                new Date(verification.updatedAt).getTime() + twoMinutes) {
                throw new common_1.HttpException("Email already sent, kindly retry after 2 minutes.", common_1.HttpStatus.BAD_REQUEST);
            }
            if (verification.attempts > 2 &&
                currentTime < new Date(verification.updatedAt).getTime() + oneHour) {
                throw new common_1.HttpException("You have already made 3 attempts. Please retry after 1 hour.", common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
        }
        const code = (0, common_helpers_1.generateRandomNumber)();
        this.verificationService.createCode(code, user._id, auth_1.verificationTypes.FORGOT_PASSWORD);
        const otpEmailData = {
            email: user.email,
            otp: code.toString(),
            fullname: user.fullName,
        };
        await this.emailQueueService.otpEmail(otpEmailData);
        return {
            message: "OTP sent to your email",
        };
    }
    async resendVerificationEmail(email) {
        const MAX_ATTEMPTS = 3;
        const RETRY_AFTER_HOURS_MS = 1 * 60 * 60 * 1000;
        const user = await this.userService.findOne({ email });
        if (!user) {
            throw new common_1.HttpException("Incorrect email, please enter the correct email", common_1.HttpStatus.UNAUTHORIZED);
        }
        const verification = await this.verificationService.findOne({
            userId: user._id,
            type: auth_1.verificationTypes.VERIFY_EMAIL,
        });
        const currentTime = Date.now();
        if (verification) {
            const timeSinceLastUpdate = currentTime - new Date(verification.updatedAt).getTime();
            if (timeSinceLastUpdate < verification_constants_1.EXPIRATION_TIME_MS) {
                throw new common_1.HttpException("Email already sent, kindly retry after 2 minutes.", common_1.HttpStatus.BAD_REQUEST);
            }
            if (verification.attempts >= MAX_ATTEMPTS &&
                timeSinceLastUpdate < RETRY_AFTER_HOURS_MS) {
                throw new common_1.HttpException("You have already made 3 attempts. Please retry after one hour.", common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
        }
        const newCode = (0, common_helpers_1.generateRandomNumber)();
        if (verification) {
            verification.code = newCode.toString();
            verification.attempts += 1;
            await verification.save();
        }
        else {
            await this.verificationService.createCode(newCode, user._id, auth_1.verificationTypes.VERIFY_EMAIL);
        }
        const otpEmailData = {
            email: user.email,
            otp: newCode.toString(),
            fullname: user.fullName,
        };
        await this.emailQueueService.otpEmail(otpEmailData);
        return {
            message: "OTP sent to your email",
        };
    }
    async resetPassword(body) {
        const { email, code, password, confirmPassword } = body;
        if (password !== confirmPassword) {
            throw new common_1.BadRequestException("Password and confirm password do not match.");
        }
        const user = await this.userService.findOne({ email });
        if (!user) {
            throw new common_1.HttpException("Incorrect email, please enter the correct email", common_1.HttpStatus.UNAUTHORIZED);
        }
        const verification = await this.verificationService.findOne({
            userId: user._id,
            type: auth_1.verificationTypes.FORGOT_PASSWORD,
        });
        if (!verification) {
            throw new common_1.HttpException("Verification record not found", common_1.HttpStatus.NOT_FOUND);
        }
        const currentTime = Date.now();
        if (currentTime > verification.expiry) {
            throw new common_1.BadRequestException("Verification code has expired. Please request a new one.");
        }
        if (verification.attempts >= 3) {
            throw new common_1.BadRequestException("You have already made 3 attempts, please retry after 24 hours");
        }
        if (verification.code === code) {
            const hashedPassword = bcrypt.hashSync(password, jwt_constant_1.jwtConstants.salt);
            await this.userService.userModel.findOneAndUpdate(user._id, {
                password: hashedPassword,
                key: user._id + code + user._id,
            });
            await this.verificationService.create({
                type: "SYSTEM",
                userId: user._id,
                code,
                isVerified: false,
                expiry: new Date().getTime() + 1000 * 60 * 30,
                attempts: 0,
            });
            const passwordResetData = {
                email: user.email,
                fullname: user.fullName,
            };
            this.emailQueueService.passwordResetSuccess(passwordResetData);
            return { message: "Password reset successfully" };
        }
        else {
            verification.attempts += 1;
            await verification.save();
            throw new common_1.BadRequestException("Incorrect pin entered");
        }
    }
    async verifyEmail(body) {
        const { email, code } = body;
        const user = await this.userService.findOne({ email });
        if (!user) {
            throw new common_1.HttpException("Incorrect email, please enter the correct email", common_1.HttpStatus.UNAUTHORIZED);
        }
        const verification = await this.verificationService.findOne({
            userId: user._id,
            type: auth_1.verificationTypes.VERIFY_EMAIL,
        });
        if (!verification) {
            throw new common_1.NotFoundException("No verification record found for this user");
        }
        const currentTime = new Date().getTime();
        if (verification.attempts >= 3) {
            const oneHourInMs = 60 * 60 * 1000;
            const timeSinceLastAttempt = currentTime - new Date(verification.updatedAt).getTime();
            if (timeSinceLastAttempt < oneHourInMs) {
                throw new common_1.BadRequestException("You have already made 3 attempts. Please retry after one hour.");
            }
            else {
                verification.attempts = 0;
            }
        }
        if (verification.code === code) {
            await this.verificationService.findOneAndUpdate({ _id: verification._id.toString() }, { isVerified: true, attempts: 0 }, { new: true });
            user.isVerified = true;
            await user.save();
            const access_token_payload = await this.createJwt(user);
            return {
                success: true,
                isVerified: user.isVerified,
                token: access_token_payload.access_token,
            };
        }
        else {
            verification.attempts += 1;
            await verification.save();
            throw new common_1.BadRequestException("Invalid verification code");
        }
    }
    extractTokenFromHeader(request) {
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader)
            return undefined;
        const [type, token] = authorizationHeader.split(" ");
        if (type !== "Bearer")
            return undefined;
        return token.trim();
    }
    async getYahooAccessToken(accessToken, refreshToken, expiresAt) {
        const currentTime = Date.now();
        if (currentTime >= expiresAt) {
            console.log("Access token expired, refreshing...");
            const newTokens = await this.refreshYahooToken(refreshToken);
            await this.storeTokens(newTokens);
            return newTokens.accessToken;
        }
        return accessToken;
    }
    async refreshYahooToken(refreshToken) {
        const clientId = process.env.YAHOO_CLIENT_ID;
        const clientSecret = process.env.YAHOO_CLIENT_SECRET;
        const tokenUrl = "https://api.login.yahoo.com/oauth2/get_token";
        const response = await axios_1.default.post(tokenUrl, null, {
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
            expiresAt: Date.now() + response.data.expires_in * 1000,
        };
    }
    async getStoredTokens() {
    }
    async storeTokens(tokens) {
        console.log(tokens, "tokens");
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(collections_1.DB_COLLECTIONS.USERS)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        email_queue_service_1.EmailQueueService,
        user_service_1.UserService,
        jwt_1.JwtService,
        verification_service_1.VerificationService])
], AuthService);
//# sourceMappingURL=auth.service.js.map