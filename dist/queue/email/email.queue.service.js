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
exports.EmailQueueService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const general_constants_1 = require("../../constants/general.constants");
let EmailQueueService = class EmailQueueService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async otpEmail(data) {
        this.mailerService
            .sendMail({
            from: `"${process.env.MAIL_FROM_NAME || 'Fantasy Showdown'}" <${process.env.MAIL_FROM_EMAIL || 'no-reply@fantasyshowdown.com'}>`,
            to: data.email,
            subject: `${general_constants_1.APP_NAME} login code: ${data.otp}`,
            text: `Hi ${data.fullname}, Here is your one time code: ${data.otp}`,
            template: general_constants_1.EMAIL_TEMPLATE_DIR + '/OptMessage',
            context: {
                otp: data.otp,
                fullname: `${data.fullname}`,
            },
        })
            .then((success) => {
            console.log('success', success);
        })
            .catch((err) => {
            console.log('mail error', err);
        });
    }
    async passwordResetSuccess(data) {
        this.mailerService
            .sendMail({
            from: `"${process.env.MAIL_FROM_NAME || 'Fantasy Showdown'}" <${process.env.MAIL_FROM_EMAIL || 'no-reply@fantasyshowdown.com'}>`,
            to: data.email,
            subject: `${general_constants_1.APP_NAME} password reset successfuly`,
            text: `Hi ${data.fullname}, your password has been reset successfuly`,
            template: general_constants_1.EMAIL_TEMPLATE_DIR + '/PasswordResetSuccess',
            context: {
                fullname: `${data.fullname}`,
                url: `${process.env.NEXT_APP}/auth/login`,
            },
        })
            .then((success) => {
            console.log(success);
        })
            .catch((err) => {
            console.log('mail error', err);
        });
    }
};
exports.EmailQueueService = EmailQueueService;
exports.EmailQueueService = EmailQueueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailQueueService);
//# sourceMappingURL=email.queue.service.js.map