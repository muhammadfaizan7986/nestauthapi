import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../../user/entities/user.entity";
import { DB_COLLECTIONS } from "src/constants/collections";
import { AdminSchema } from "src/modules/admin/entities/admin.entity";
import { VerificationSchema } from "src/modules/verification/entities/verification.entity";
import { TokenSchema } from "src/modules/token/entities/token.entity";

const models = [
  { name: DB_COLLECTIONS.USERS, schema: UserSchema },
  { name: DB_COLLECTIONS.ADMIN, schema: AdminSchema },
  { name: DB_COLLECTIONS.VERIFICATIONS, schema: VerificationSchema },
  { name: DB_COLLECTIONS.NFT, schema: TokenSchema },
];
@Module({
  imports: [MongooseModule.forFeature(models)],
  exports: [MongooseModule.forFeature(models)],
})
export class DatabaseModule {}
