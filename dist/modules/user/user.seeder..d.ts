import { Model } from 'mongoose';
import { UserDocument } from './entities/user.entity';
export declare class UserSeeder {
    readonly userModel: Model<UserDocument>;
    constructor(userModel: Model<UserDocument>);
    seed(): Promise<any>;
    drop(): Promise<any>;
}
