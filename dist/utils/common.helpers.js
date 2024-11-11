"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = void 0;
const generateRandomNumber = () => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return random;
};
exports.generateRandomNumber = generateRandomNumber;
//# sourceMappingURL=common.helpers.js.map