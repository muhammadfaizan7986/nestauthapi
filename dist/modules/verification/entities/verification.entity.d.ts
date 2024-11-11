import { Document } from 'mongoose';
import { Types } from 'mongoose';
export type VerificationDocument = Verification & Document;
export declare class Verification {
    userId: Types.ObjectId;
    code: string;
    isVerified: boolean;
    expiry: number;
    type: string;
    attempts: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const VerificationSchema: import("mongoose").Schema<Verification, import("mongoose").Model<Verification, any, any, any, Document<unknown, any, Verification> & Verification & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Verification, Document<unknown, {}, import("mongoose").FlatRecord<Verification>> & import("mongoose").FlatRecord<Verification> & {
    _id: Types.ObjectId;
}>;
