import { UserDocument } from 'src/modules/user/entities/user.entity';
export declare class SignOutResult {
    success?: boolean;
    user?: Partial<UserDocument>;
    access_token?: string;
    message?: string;
    isVerified?: boolean;
}
