import { JwtService } from "@nestjs/jwt";
import { UserDocument } from "src/modules/user/entities/user.entity";
import { SignInInput } from "./dto/create-auth.dto";
import { SignOutResult } from "./dto/update-auth.dto";
import { UserService } from "../user/user.service";
import { VerificationService } from "../verification/verification.service";
import { Model } from "mongoose";
import { LoginDto } from "./dto/login.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";
import { EmailQueueService } from "src/queue/email/email.queue.service";
export declare class AuthService {
    private userModel;
    private readonly emailQueueService;
    private readonly userService;
    private readonly jwtService;
    private readonly verificationService;
    constructor(userModel: Model<UserDocument>, emailQueueService: EmailQueueService, userService: UserService, jwtService: JwtService, verificationService: VerificationService);
    createJwt(u: UserDocument): Promise<{
        user: UserDocument;
        access_token: string;
    }>;
    validateToken(token: string): Promise<any>;
    signup(body: SignInInput): Promise<SignOutResult>;
    login(loginDto: LoginDto): Promise<SignOutResult>;
    sendPasswordResetEmail(email: string): Promise<{
        message: string;
    }>;
    resendVerificationEmail(email: string): Promise<{
        message: string;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<{
        message: string;
    }>;
    verifyEmail(body: {
        email: string;
        code: string;
    }): Promise<{
        success: boolean;
        isVerified: boolean;
        token: string;
    }>;
    extractTokenFromHeader(request: any): string | undefined;
    getYahooAccessToken(accessToken: any, refreshToken: any, expiresAt: number): Promise<any>;
    refreshYahooToken(refreshToken: any): Promise<{
        accessToken: any;
        refreshToken: any;
        expiresAt: number;
    }>;
    getStoredTokens(): Promise<void>;
    storeTokens(tokens: any): Promise<void>;
}
