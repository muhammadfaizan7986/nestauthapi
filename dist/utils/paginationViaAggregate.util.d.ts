import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
export declare function paginationViaAggregate<T>(model: Model<T>, aggregatePipeline: any[], paginationDto: PaginationDto, populateFields?: any[]): Promise<{
    data: T[];
    totalCount: number;
    totalPages: number;
    page: number;
    limit: number;
}>;
