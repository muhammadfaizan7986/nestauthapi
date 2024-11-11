import { Document } from 'mongoose';
export type TokenDocument = Token & Document;
export declare class Token {
    name: string;
    tokenId: string;
    creator: string;
    owner: string;
    metadataURI: string;
    collection: string;
    blockchain: string;
    isBurned: boolean;
    type?: string;
    rarity?: string;
    score?: number;
    image?: string;
    stats?: Map<string, number>;
    bonusStatTiers?: boolean;
    legendaryAspects?: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const TokenSchema: import("mongoose").Schema<Token, import("mongoose").Model<Token, any, any, any, Document<unknown, any, Token> & Token & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Token, Document<unknown, {}, import("mongoose").FlatRecord<Token>> & import("mongoose").FlatRecord<Token> & {
    _id: import("mongoose").Types.ObjectId;
}>;
