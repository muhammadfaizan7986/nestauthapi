import { AuthService } from "./auth.service";
import { SignInInput } from "./dto/create-auth.dto";
import { SignOutResult } from "./dto/update-auth.dto";
import { UserDocument } from "../user/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";
import { VerifyEmailDto } from "./dto/verifyEmail.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: SignInInput): Promise<SignOutResult>;
    login(body: LoginDto): Promise<SignOutResult>;
    getProfile(user: UserDocument): import("mongoose").Document<unknown, {}, import("../user/entities/user.entity").User> & import("../user/entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    };
    sendPasswordReset(email: string): Promise<{
        message: string;
    }>;
    resendVerificationEmail(email: string): Promise<{
        message: string;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<{
        message: string;
    }>;
    verifyEmail(body: VerifyEmailDto): Promise<{
        success: boolean;
        isVerified: boolean;
        token: string;
    }>;
}
