import { VerificationService } from './verification.service';
export declare class VerificationController {
    private readonly verificationService;
    constructor(verificationService: VerificationService);
    createCode(code: number, userId: any, type?: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/verification.entity").VerificationDocument> & import("./entities/verification.entity").Verification & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    findByUserId(userId: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/verification.entity").VerificationDocument> & import("./entities/verification.entity").Verification & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    findOne(query: any): Promise<import("mongoose").Document<unknown, {}, import("./entities/verification.entity").VerificationDocument> & import("./entities/verification.entity").Verification & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    create(data: any): Promise<import("mongoose").Document<unknown, {}, import("./entities/verification.entity").VerificationDocument> & import("./entities/verification.entity").Verification & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
}
