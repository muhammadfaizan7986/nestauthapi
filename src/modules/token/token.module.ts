import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { CommonModule } from '../common/modules/common.module';

@Module({
  imports: [CommonModule],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
