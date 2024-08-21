"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMoreDescriptiveError = void 0;
const core_1 = require("@actions/core");
const axios_1 = require("axios");
const toMoreDescriptiveError = (error) => {
    if ((0, axios_1.isAxiosError)(error) &&
        Number(error.response?.status) >= 400 &&
        Number(error.response?.status) < 500 &&
        Array.isArray(error.response?.data.errorMessages)) {
        return new Error(error.response?.data.errorMessages[0]);
    }
    else {
        (0, core_1.debug)(`${error}`);
        return error;
    }
};
exports.toMoreDescriptiveError = toMoreDescriptiveError;
//# sourceMappingURL=utils.js.map