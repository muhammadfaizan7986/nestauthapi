import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    create(): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string): string;
    remove(id: string): string;
}
