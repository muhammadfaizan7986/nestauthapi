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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const collections_1 = require("../../constants/collections");
const mongoose_2 = require("mongoose");
const pagination_util_1 = require("../../utils/pagination.util");
let TokenService = class TokenService {
    constructor(tokenModel) {
        this.tokenModel = tokenModel;
    }
    create(createTokenDto) {
        return this.tokenModel.create(createTokenDto);
    }
    findAll(query, page = 1, limit = 10) {
        return (0, pagination_util_1.paginate)(this.tokenModel, query, { limit, page });
    }
    findOne(id) {
        return this.tokenModel.findById(id);
    }
    update(id, updateTokenDto) {
        return this.tokenModel.findByIdAndUpdate(id, updateTokenDto);
    }
    remove(id) {
        return this.tokenModel.findByIdAndDelete(id);
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(collections_1.DB_COLLECTIONS.NFT)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TokenService);
//# sourceMappingURL=token.service.js.map