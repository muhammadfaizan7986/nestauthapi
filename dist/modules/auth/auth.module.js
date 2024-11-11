"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const jwt_constant_1 = require("../../constants/jwt.constant");
const common_module_1 = require("../common/modules/common.module");
const admin_service_1 = require("../admin/admin.service");
const verification_module_1 = require("../verification/verification.module");
const verification_service_1 = require("../verification/verification.service");
const passport_1 = require("@nestjs/passport");
const email_queue_module_1 = require("../../queue/email/email.queue.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_module_1.CommonModule,
            email_queue_module_1.EmailQueueModule,
            jwt_1.JwtModule.register({
                signOptions: { expiresIn: jwt_constant_1.jwtConstants.expire },
                secret: jwt_constant_1.jwtConstants.secret,
                verifyOptions: {
                    algorithms: ["HS256"],
                },
            }),
            verification_module_1.VerificationModule,
            passport_1.PassportModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            user_service_1.UserService,
            auth_service_1.AuthService,
            jwt_1.JwtService,
            admin_service_1.AdminService,
            verification_service_1.VerificationService,
        ],
        exports: [auth_service_1.AuthService, jwt_1.JwtService, user_service_1.UserService, admin_service_1.AdminService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map