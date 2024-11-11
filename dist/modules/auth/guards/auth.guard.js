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
exports.JWTAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_constant_1 = require("../../../constants/jwt.constant");
const user_service_1 = require("../../user/user.service");
let JWTAuthGuard = class JWTAuthGuard {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwt_constant_1.jwtConstants.secret,
            });
            const user = await this.userService.findUserById(payload._id);
            if (!user.isVerified) {
                throw new common_1.UnauthorizedException('User is not verified. Please verify your account.');
            }
            if (!user) {
                throw new common_1.UnauthorizedException('User not found.');
            }
            request['user'] = user;
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader)
            return undefined;
        const [type, token] = authorizationHeader.split(' ');
        if (type !== 'Bearer')
            return undefined;
        return token.trim();
    }
};
exports.JWTAuthGuard = JWTAuthGuard;
exports.JWTAuthGuard = JWTAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], JWTAuthGuard);
//# sourceMappingURL=auth.guard.js.map