import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { FilterQuery, Model } from 'mongoose';
import { TokenDocument } from './entities/token.entity';
import { PaginatedResults } from 'src/interfaces/common.interface';
export declare class TokenService {
    private tokenModel;
    constructor(tokenModel: Model<TokenDocument>);
    create(createTokenDto: CreateTokenDto): Promise<import("mongoose").Document<unknown, {}, TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    findAll(query: FilterQuery<TokenDocument>, page?: number, limit?: number): Promise<PaginatedResults<TokenDocument>>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, import("mongoose").Document<unknown, {}, TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, {}, TokenDocument, "findOne", {}>;
    update(id: string, updateTokenDto: UpdateTokenDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, import("mongoose").Document<unknown, {}, TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, {}, TokenDocument, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, import("mongoose").Document<unknown, {}, TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, {}, TokenDocument, "findOneAndDelete", {}>;
}
