"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationTypes = exports.emailRegex = void 0;
exports.emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.verificationTypes = {
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    VERIFY_EMAIL: 'VERIFY_EMAIL',
    RESEND_CODE: 'RESEND_CODE',
    TWO_FA: 'TWO_FA',
};
//# sourceMappingURL=auth.js.map