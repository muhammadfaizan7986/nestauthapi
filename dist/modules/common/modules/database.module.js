"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../../user/entities/user.entity");
const collections_1 = require("../../../constants/collections");
const admin_entity_1 = require("../../admin/entities/admin.entity");
const verification_entity_1 = require("../../verification/entities/verification.entity");
const token_entity_1 = require("../../token/entities/token.entity");
const models = [
    { name: collections_1.DB_COLLECTIONS.USERS, schema: user_entity_1.UserSchema },
    { name: collections_1.DB_COLLECTIONS.ADMIN, schema: admin_entity_1.AdminSchema },
    { name: collections_1.DB_COLLECTIONS.VERIFICATIONS, schema: verification_entity_1.VerificationSchema },
    { name: collections_1.DB_COLLECTIONS.NFT, schema: token_entity_1.TokenSchema },
];
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature(models)],
        exports: [mongoose_1.MongooseModule.forFeature(models)],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map