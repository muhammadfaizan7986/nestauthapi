"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSchema = exports.Token = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
let Token = class Token {
};
exports.Token = Token;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Token.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Token.prototype, "tokenId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, lowercase: true }),
    (0, class_validator_1.IsEthereumAddress)(),
    __metadata("design:type", String)
], Token.prototype, "creator", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, lowercase: true }),
    (0, class_validator_1.IsEthereumAddress)(),
    __metadata("design:type", String)
], Token.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Token.prototype, "metadataURI", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Token.prototype, "collection", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Token.prototype, "blockchain", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Token.prototype, "isBurned", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['helmet', 'jersey', 'cleats', 'gloves', 'pants'],
    }),
    __metadata("design:type", String)
], Token.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    }),
    __metadata("design:type", String)
], Token.prototype, "rarity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Token.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Token.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: {} }),
    __metadata("design:type", Map)
], Token.prototype, "stats", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Token.prototype, "bonusStatTiers", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        enum: ['Clutch', 'Fast Starter', 'Halftime Hero'],
        default: [],
    }),
    __metadata("design:type", Array)
], Token.prototype, "legendaryAspects", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Token.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Token.prototype, "updatedAt", void 0);
exports.Token = Token = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, suppressReservedKeysWarning: true })
], Token);
exports.TokenSchema = mongoose_1.SchemaFactory.createForClass(Token);
//# sourceMappingURL=token.entity.js.map