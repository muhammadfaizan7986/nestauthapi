import { FilterQuery, Model, Types } from 'mongoose';
import { Verification, VerificationDocument } from './entities/verification.entity';
export declare class VerificationService {
    private verificationModel;
    constructor(verificationModel: Model<VerificationDocument>);
    createCode(code: number, userId: Types.ObjectId, type?: string): Promise<import("mongoose").Document<unknown, {}, VerificationDocument> & Verification & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    findByUserId(userId: string): Promise<import("mongoose").Document<unknown, {}, VerificationDocument> & Verification & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    findOne(query: FilterQuery<VerificationDocument>): Promise<import("mongoose").Document<unknown, {}, VerificationDocument> & Verification & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    create(data: Verification): Promise<import("mongoose").Document<unknown, {}, VerificationDocument> & Verification & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    findOneAndUpdate(filter: {
        _id: string;
    }, update: Partial<Verification>, options?: {
        new: boolean;
    }): Promise<Verification | null>;
    verifyCode(data: {
        userId: string;
        code: string;
    }): Promise<{
        success: boolean;
    }>;
}
