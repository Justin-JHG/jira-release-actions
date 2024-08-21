"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
const core_1 = require("@actions/core");
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("./utils");
class API {
    authToken;
    projectName;
    domain;
    constructor(email, token, name, domain) {
        this.authToken = `${Buffer.from(`${email}:${token}`).toString('base64')}`;
        this.projectName = name;
        this.domain = domain;
    }
    async createVersion(body) {
        try {
            const response = await axios_1.default.post(`${this.domain}/rest/api/3/version`, body, {
                headers: this._headers()
            });
            return response.data;
        }
        catch (error) {
            throw (0, utils_1.toMoreDescriptiveError)(error);
        }
    }
    async updateVersion(id, body) {
        try {
            (0, core_1.debug)(JSON.stringify(body));
            const response = await axios_1.default.put(`${this.domain}/rest/api/3/version/${id}`, body, {
                headers: this._headers()
            });
            return response.data;
        }
        catch (error) {
            throw (0, utils_1.toMoreDescriptiveError)(error);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async updateIssue(ticket_id, version_id) {
        try {
            const response = await axios_1.default.put(`${this.domain}/rest/api/3/issue/${ticket_id}`, {
                update: {
                    fixVersions: [
                        {
                            add: { id: version_id }
                        }
                    ]
                }
            }, { headers: this._headers() });
            return response.data;
        }
        catch (error) {
            throw (0, utils_1.toMoreDescriptiveError)(error);
        }
    }
    async loadProject() {
        try {
            const response = await axios_1.default.get(`${this.domain}/rest/api/3/project/${this.projectName}?properties=versions,key,id,name`, { headers: this._headers() });
            return response.data;
        }
        catch (error) {
            throw (0, utils_1.toMoreDescriptiveError)(error);
        }
    }
    _headers() {
        return {
            Authorization: `Basic ${this.authToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
    }
}
exports.API = API;
//# sourceMappingURL=api.js.map