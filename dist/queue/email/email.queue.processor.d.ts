import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailQueueProcessor {
    private readonly mailerService;
    constructor(mailerService: MailerService);
}
