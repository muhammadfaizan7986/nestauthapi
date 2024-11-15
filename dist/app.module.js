"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const common_module_1 = require("./modules/common/modules/common.module");
const app_controller_1 = require("./app.controller");
const config_1 = require("@nestjs/config");
const app_service_1 = require("./app.service");
const bull_1 = require("@nestjs/bull");
const admin_module_1 = require("./modules/admin/admin.module");
const verification_module_1 = require("./modules/verification/verification.module");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const mailer_1 = require("@nestjs-modules/mailer");
const queue_constants_1 = require("./constants/queue.constants");
const token_module_1 = require("./modules/token/token.module");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV || "production"}`,
                cache: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            common_module_1.CommonModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            admin_module_1.AdminModule,
            verification_module_1.VerificationModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.MAIL_URL,
                    port: process.env.MAIL_PORT,
                    secure: process.env.MAIL_SECURE && process.env.MAIL_SECURE == "yes"
                        ? true
                        : false,
                    auth: {
                        user: process.env.MAIL_USERNAME,
                        pass: process.env.MAIL_PASSWORD,
                    },
                },
                defaults: {
                    from: `'${process.env.MAIL_FROM_NAME}' <${process.env.MAIL_FROM_EMAIL}>`,
                },
                template: {
                    dir: process.cwd() + "/static/email-templates/",
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            bull_1.BullModule.forRoot({
                redis: {
                    host: process.env.REDIS_URL || "localhost",
                    port: parseInt(process.env.REDIS_PORT) || 6379,
                    password: process.env.REDIS_PASSWORD,
                },
            }),
            bull_1.BullModule.registerQueue({
                name: queue_constants_1.QUEUE_EMAIL_SERVICE,
            }),
            token_module_1.TokenModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map