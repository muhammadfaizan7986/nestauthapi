import { Admin, AdminDocument } from './entities/admin.entity';
import { Model } from 'mongoose';
import { AdminDto } from './dto/admin.dto';
export declare class AdminService {
    adminModel: Model<AdminDocument>;
    private readonly saltRounds;
    private readonly jwtSecret;
    constructor(adminModel: Model<AdminDocument>);
    createAdmin(adminDto: AdminDto): Promise<Admin>;
    login(adminDto: AdminDto): Promise<{
        token: string;
    }>;
    resetPassword(email: string, newPassword: string): Promise<Admin>;
    findOneByEmail(email: string): Promise<Admin | null>;
    updateAdmin(id: string, adminDto: AdminDto): Promise<Admin>;
    deleteAdmin(id: string): Promise<{
        message: string;
    }>;
}
