import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DB_COLLECTIONS } from 'src/constants/collections';
import { FilterQuery, Model } from 'mongoose';
import { TokenDocument } from './entities/token.entity';
import { PaginatedResults } from 'src/interfaces/common.interface';
import { paginate } from 'src/utils/pagination.util';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(DB_COLLECTIONS.NFT) private tokenModel: Model<TokenDocument>,
  ) {}

  create(createTokenDto: CreateTokenDto) {
    return this.tokenModel.create(createTokenDto);
  }

  findAll(
    query: FilterQuery<TokenDocument>,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResults<TokenDocument>> {
    return paginate(this.tokenModel, query, { limit, page });
  }

  findOne(id: string) {
    return this.tokenModel.findById(id);
  }

  update(id: string, updateTokenDto: UpdateTokenDto) {
    return this.tokenModel.findByIdAndUpdate(id, updateTokenDto);
  }

  remove(id: string) {
    return this.tokenModel.findByIdAndDelete(id);
  }
}
