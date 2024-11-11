import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
export declare function paginate<T>(model: Model<T>, query: any, paginationDto: PaginationDto, populateFields?: any[]): Promise<{
    data: T[];
    totalCount: number;
    totalPages: number;
    page: number;
    limit: number;
}>;
