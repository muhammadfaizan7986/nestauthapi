import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEthereumAddress } from 'class-validator';
import { Document } from 'mongoose';

// Base Token schema with additional properties
export type TokenDocument = Token & Document;

@Schema({ timestamps: true, suppressReservedKeysWarning: true })
export class Token {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  tokenId: string;

  @Prop({ required: true, lowercase: true })
  @IsEthereumAddress()
  creator: string;

  @Prop({ required: true, lowercase: true })
  @IsEthereumAddress()
  owner: string;

  @Prop()
  metadataURI: string;

  @Prop({ required: true })
  collection: string;

  @Prop({ required: true })
  blockchain: string;

  @Prop({ default: false })
  isBurned: boolean;

  @Prop({
    enum: ['helmet', 'jersey', 'cleats', 'gloves', 'pants'],
  })
  type?: string; // Type of gear (optional)

  @Prop({
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
  })
  rarity?: string; // Rarity of the gear (optional)

  @Prop({ default: 0 })
  score?: number; // Default 0 for gear score (optional)

  @Prop()
  image?: string; // Image URL for gear (optional)

  @Prop({ default: {} })
  stats?: Map<string, number>; // Stat boosts for different game aspects (optional)

  @Prop({ default: false })
  bonusStatTiers?: boolean; // Special modifier for Epic and Legendary gear (optional)

  @Prop({
    type: [String],
    enum: ['Clutch', 'Fast Starter', 'Halftime Hero'],
    default: [],
  })
  legendaryAspects?: string[]; // Special abilities for Legendary gear (optional)

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
