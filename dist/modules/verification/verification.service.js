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
exports.VerificationService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const collections_1 = require("../../constants/collections");
const verification_constants_1 = require("./verification.constants");
let VerificationService = class VerificationService {
    constructor(verificationModel) {
        this.verificationModel = verificationModel;
    }
    async createCode(code, userId, type) {
        let verification = await this.verificationModel.findOneAndUpdate({ userId: userId }, {
            expiry: new Date().getTime() + verification_constants_1.EXPIRATION_TIME_MS,
            isVerified: false,
            code: code,
            type: type,
            attempts: 0,
        });
        if (!verification) {
            verification = await this.verificationModel.create({
                userId: userId,
                expiry: new Date().getTime() + verification_constants_1.EXPIRATION_TIME_MS,
                isVerified: false,
                code: code,
                type: type,
            });
        }
        return verification;
    }
    async findByUserId(userId) {
        const verification = await this.verificationModel.findOne({
            userId: userId,
        });
        if (!verification) {
            throw new Error('`Session expired try again.`');
        }
        return verification;
    }
    async findOne(query) {
        return this.verificationModel.findOne(query);
    }
    async create(data) {
        return this.verificationModel.create(data);
    }
    async findOneAndUpdate(filter, update, options) {
        return this.verificationModel
            .findOneAndUpdate(filter, update, options)
            .exec();
    }
    async verifyCode(data) {
        const { userId, code } = data;
        const verification = await this.findByUserId(userId);
        if (verification.attempts > 2) {
            throw new Error('You have already made 3 attempts please retry after 24 hours');
        }
        else {
            if (verification.code === code) {
                await this.verificationModel.findOneAndUpdate({ _id: verification._id }, { isVerified: true }, { new: true });
                return { success: true };
            }
            else {
                verification.attempts = verification.attempts + 1;
                await verification.save();
                throw new Error('Incorrect pin entered');
            }
        }
    }
};
exports.VerificationService = VerificationService;
exports.VerificationService = VerificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(collections_1.DB_COLLECTIONS.VERIFICATIONS)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], VerificationService);
//# sourceMappingURL=verification.service.js.map