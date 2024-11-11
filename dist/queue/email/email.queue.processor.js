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
exports.EmailQueueProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const queue_constants_1 = require("../../constants/queue.constants");
const mailer_1 = require("@nestjs-modules/mailer");
let EmailQueueProcessor = class EmailQueueProcessor {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
};
exports.EmailQueueProcessor = EmailQueueProcessor;
exports.EmailQueueProcessor = EmailQueueProcessor = __decorate([
    (0, bull_1.Processor)(queue_constants_1.QUEUE_EMAIL_SERVICE),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailQueueProcessor);
//# sourceMappingURL=email.queue.processor.js.map