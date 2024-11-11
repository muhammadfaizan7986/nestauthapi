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
exports.SignInInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SignInInput {
}
exports.SignInInput = SignInInput;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(25, {
        message: 'Max. length of 25 character for full Name',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'Full name of the user',
        example: 'John Doe',
    }),
    __metadata("design:type", String)
], SignInInput.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, {
        message: 'Invalid email format',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'Email address of the user',
        example: 'jhonDoe@gmail.com',
    }),
    __metadata("design:type", String)
], SignInInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MinLength)(8, {
        message: 'Password must be at least 8 characters long',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!$%^&()_+|~=`{}\[\]:";'<>?,.#@*-\/\\]).{8,}$/, {
        message: 'Minimum eight characters, at least one letter, one number and one special character',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'Password for the account',
        example: 'jhonDoe@123',
    }),
    __metadata("design:type", String)
], SignInInput.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.MinLength)(8, {
        message: 'Confirm Password must be at least 8 characters long',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!$%^&()_+|~=`{}\[\]:";'<>?,.#@*-\/\\]).{8,}$/, {
        message: 'Minimum eight characters, at least one letter, one number and one special character',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'Confirm Password for the account',
        example: 'jhonDoe@123',
    }),
    __metadata("design:type", String)
], SignInInput.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Please accept the Terms of Service and Privacy Policy to proceed.',
        example: true,
    }),
    __metadata("design:type", Boolean)
], SignInInput.prototype, "terms", void 0);
//# sourceMappingURL=create-auth.dto.js.map