"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
async function paginate(model, query = {}, paginationDto, populateFields = []) {
    const { page = 1, limit = 10, sort = { createdAt: -1 } } = paginationDto;
    const skip = (page - 1) * limit;
    const [data, totalCount] = await Promise.all([
        model
            .find(query)
            .populate(populateFields)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec(),
        model.countDocuments(query).exec(),
    ]);
    const totalPages = Math.ceil(totalCount / limit);
    return {
        data,
        totalCount,
        totalPages,
        page,
        limit,
    };
}
//# sourceMappingURL=pagination.util.js.map