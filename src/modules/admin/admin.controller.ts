import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './entities/admin.entity';

@ApiTags('Admin')
@ApiBearerAuth('JWT-auth')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  async createAdmin(@Body() adminDto: AdminDto) {
    return this.adminService.createAdmin(adminDto);
  }

  @Post('login')
  async login(@Body() adminDto: AdminDto) {
    return this.adminService.login(adminDto);
  }

  @ApiBody({ type: AdminDto })
  @ApiResponse({
    status: 201,
    description: 'Password reset successfully ',
    type: AdminDto,
  })
  @Put('reset-password')
  async resetPassword(@Body() body: { email: string; newPassword: string }) {
    return this.adminService.resetPassword(body.email, body.newPassword);
  }

  @Patch(':id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() adminDto: AdminDto,
  ): Promise<Admin> {
    return this.adminService.updateAdmin(id, adminDto);
  }

  @Delete(':id')
  async deleteAdmin(@Param('id') id: string): Promise<{ message: string }> {
    return this.adminService.deleteAdmin(id);
  }
}
