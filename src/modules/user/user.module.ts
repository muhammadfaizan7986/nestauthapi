import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CommonModule } from '../common/modules/common.module';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [UserService, AdminService, JwtService],
  exports: [UserService],
})
export class UserModule {}
