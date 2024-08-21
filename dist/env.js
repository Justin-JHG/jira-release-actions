"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARCHIVE = exports.RELEASE = exports.CREATE = exports.DRY_RUN = exports.TICKETS = exports.PROJECT = exports.TIME_ZONE = exports.RELEASE_NAME = exports.SUBDOMAIN = exports.API_TOKEN = exports.EMAIL = void 0;
const core_1 = require("@actions/core");
// Jira API credentials
exports.EMAIL = (0, core_1.getInput)('jira_user_email', { required: true });
exports.API_TOKEN = (0, core_1.getInput)('jira_api_token', { required: true });
exports.SUBDOMAIN = (0, core_1.getInput)('jira_base_url', { required: true });
// Release information
exports.RELEASE_NAME = (0, core_1.getInput)('release_name', { required: true });
exports.TIME_ZONE = (0, core_1.getInput)('time_zone', { required: false });
exports.PROJECT = (0, core_1.getInput)('jira_project', { required: true });
exports.TICKETS = (0, core_1.getInput)('tickets', { required: false });
// Github actions
exports.DRY_RUN = (0, core_1.getInput)('dry_run', { required: false });
exports.CREATE = (0, core_1.getBooleanInput)('create', { required: false });
exports.RELEASE = (0, core_1.getBooleanInput)('release', { required: false });
exports.ARCHIVE = (0, core_1.getBooleanInput)('archive', { required: false });
//# sourceMappingURL=env.js.map