import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { Admin } from './entities/admin.entity';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createAdmin(adminDto: AdminDto): Promise<Admin>;
    login(adminDto: AdminDto): Promise<{
        token: string;
    }>;
    resetPassword(body: {
        email: string;
        newPassword: string;
    }): Promise<Admin>;
    updateAdmin(id: string, adminDto: AdminDto): Promise<Admin>;
    deleteAdmin(id: string): Promise<{
        message: string;
    }>;
}
