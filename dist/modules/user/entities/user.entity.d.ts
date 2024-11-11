import { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;
export declare class User {
    profileImage: string;
    fullName: string;
    email: string;
    isVerified: boolean;
    password: string;
    terms: boolean;
    createdAt: Date;
    updatedAt: Date;
    checkPassword(password: string): Promise<boolean>;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
}>;
