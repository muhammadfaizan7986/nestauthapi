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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const collections_1 = require("../../constants/collections");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_constant_1 = require("../../constants/jwt.constant");
let AdminService = class AdminService {
    constructor(adminModel) {
        this.adminModel = adminModel;
        this.saltRounds = jwt_constant_1.jwtConstants.salt;
        this.jwtSecret = jwt_constant_1.jwtConstants.secret;
    }
    async createAdmin(adminDto) {
        const hashedPassword = await bcrypt.hash(adminDto.password, this.saltRounds);
        const createdAdmin = new this.adminModel({
            ...adminDto,
            password: hashedPassword,
        });
        return createdAdmin.save();
    }
    async login(adminDto) {
        const admin = await this.adminModel
            .findOne({ email: adminDto.email })
            .exec();
        if (!admin || !(await bcrypt.compare(adminDto.password, admin.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = jwt.sign({ email: admin.email }, this.jwtSecret, {
            expiresIn: jwt_constant_1.jwtConstants.expire,
        });
        console.log('JWT Token from Controller:', token);
        return { token };
    }
    async resetPassword(email, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);
        return this.adminModel
            .findOneAndUpdate({ email }, { password: hashedPassword }, { new: true })
            .exec();
    }
    async findOneByEmail(email) {
        return this.adminModel.findOne({ email }).exec();
    }
    async updateAdmin(id, adminDto) {
        const admin = await this.adminModel.findById(id).exec();
        if (!admin) {
            throw new common_1.NotFoundException('Admin not found');
        }
        if (adminDto.password) {
            adminDto.password = await bcrypt.hash(adminDto.password, this.saltRounds);
        }
        return this.adminModel
            .findOneAndUpdate({ _id: id }, { $set: adminDto }, { new: true })
            .exec();
    }
    async deleteAdmin(id) {
        const admin = await this.adminModel.findById(id).exec();
        if (!admin) {
            throw new common_1.NotFoundException('Admin not found');
        }
        await this.adminModel.deleteOne({ _id: id }).exec();
        return { message: 'Admin deleted successfully' };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(collections_1.DB_COLLECTIONS.ADMIN)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminService);
//# sourceMappingURL=admin.service.js.map