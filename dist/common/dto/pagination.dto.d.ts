import { SortOrder } from 'mongoose';
export declare class PaginationDto {
    limit?: number;
    page?: number;
    sort?: string | {
        [key: string]: SortOrder;
    } | [string, SortOrder][];
}
