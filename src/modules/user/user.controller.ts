import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getAll(@Query() query: PaginationDto) {
    const { page = 1, limit = 10, ...filter } = query;
    return this.userService.findAll(filter, Number(page), Number(limit));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findUserById(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.findUserById(id);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Patch('update-user/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateContestDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateContestDto);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.deleteUser(id);
  }
}
