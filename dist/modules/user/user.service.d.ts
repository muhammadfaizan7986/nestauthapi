import { Model } from 'mongoose';
import { UserDocument } from './entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    readonly userModel: Model<UserDocument>;
    constructor(userModel: Model<UserDocument>);
    create(data: any): Promise<UserDocument>;
    findOne(clause: {
        [key: string]: unknown;
    }): Promise<UserDocument | undefined>;
    findAll(filter: PaginationDto, page: any, limit: any): Promise<{
        data: import("./entities/user.entity").User[];
        totalCount: number;
        totalPages: number;
        page: number;
        limit: number;
    }>;
    findUserById(id: string): Promise<UserDocument>;
    updateUser(id: number, updateContestDto: UpdateUserDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./entities/user.entity").User> & import("./entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./entities/user.entity").User> & import("./entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./entities/user.entity").User> & import("./entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./entities/user.entity").User> & import("./entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, import("./entities/user.entity").User> & import("./entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    }, "findOneAndUpdate", {}>;
    deleteUser(id: string): Promise<UserDocument>;
}
