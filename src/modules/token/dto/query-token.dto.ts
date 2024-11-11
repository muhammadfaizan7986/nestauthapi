import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class TokenQueryDto {
  @IsOptional()
  @IsString()
  @Type(() => String)
  name?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  tokenId?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  creator?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  owner?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  metadataURI?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  collection?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  blockchain?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isBurned?: boolean;
}
