import { TokenService } from './token.service';
import { CreateTokenDto, TokenPaginationDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
export declare class TokenController {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    create(createTokenDto: CreateTokenDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/token.entity").TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    getAll(query: TokenPaginationDto): Promise<import("../../interfaces/common.interface").PaginatedResults<import("./entities/token.entity").TokenDocument>>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./entities/token.entity").TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, import("mongoose").Document<unknown, {}, import("./entities/token.entity").TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, {}, import("./entities/token.entity").TokenDocument, "findOne", {}>;
    update(id: string, updateTokenDto: UpdateTokenDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./entities/token.entity").TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, import("mongoose").Document<unknown, {}, import("./entities/token.entity").TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, {}, import("./entities/token.entity").TokenDocument, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./entities/token.entity").TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, import("mongoose").Document<unknown, {}, import("./entities/token.entity").TokenDocument> & import("./entities/token.entity").Token & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, {}, import("./entities/token.entity").TokenDocument, "findOneAndDelete", {}>;
}
