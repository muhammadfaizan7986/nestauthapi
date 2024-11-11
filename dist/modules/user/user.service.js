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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const collections_1 = require("../../constants/collections");
const pagination_util_1 = require("../../utils/pagination.util");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    create(data) {
        return this.userModel.create(data);
    }
    async findOne(clause) {
        return this.userModel.findOne(clause).exec();
    }
    async findAll(filter, page, limit) {
        const query = {};
        Object.keys(filter).forEach((key) => {
            if (filter[key]) {
                query[key] = { $regex: filter[key], $options: 'i' };
            }
        });
        return (0, pagination_util_1.paginate)(this.userModel, query, {
            page,
            limit,
            sort: { _id: -1 },
        });
    }
    async findUserById(id) {
        return this.userModel.findById(id).exec();
    }
    updateUser(id, updateContestDto) {
        return this.userModel.findByIdAndUpdate(id, updateContestDto);
    }
    async deleteUser(id) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(collections_1.DB_COLLECTIONS.USERS)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map