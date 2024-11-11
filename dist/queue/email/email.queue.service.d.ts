import { MailerService } from '@nestjs-modules/mailer';
import { EMAIL_OTP_INTERFACE, FORGET_PASSWORD_INTERFACE } from './email.interface';
export declare class EmailQueueService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    otpEmail(data: EMAIL_OTP_INTERFACE): Promise<void>;
    passwordResetSuccess(data: FORGET_PASSWORD_INTERFACE): Promise<void>;
}
