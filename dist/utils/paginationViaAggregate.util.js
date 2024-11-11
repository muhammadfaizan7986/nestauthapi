"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationViaAggregate = paginationViaAggregate;
async function paginationViaAggregate(model, aggregatePipeline = [], paginationDto, populateFields = []) {
    const { page = 1, limit = 10, sort = { createdAt: -1 } } = paginationDto;
    const skip = (page - 1) * limit;
    const dataPipeline = [
        ...aggregatePipeline,
        { $sort: sort },
        { $skip: skip },
        { $limit: limit },
    ];
    const countPipeline = [...aggregatePipeline, { $count: 'totalCount' }];
    const [data, countResult] = await Promise.all([
        model.aggregate(dataPipeline).exec(),
        model.aggregate(countPipeline).exec(),
    ]);
    const totalCount = countResult[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limit);
    const populatedData = await model.populate(data, populateFields);
    return {
        data: populatedData,
        totalCount,
        totalPages,
        page,
        limit,
    };
}
//# sourceMappingURL=paginationViaAggregate.util.js.map