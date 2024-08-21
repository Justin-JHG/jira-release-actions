"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const env_1 = require("./env");
const api_1 = require("./api");
const DebugMessages = __importStar(require("./constants/debug-messages"));
const printConfiguration = () => {
    (0, core_1.info)(`
    CONFIGURED WITH OPTIONS:
      * email ${env_1.EMAIL}
      * project: ${env_1.PROJECT}
      * subdomain: ${env_1.SUBDOMAIN}
      * release_name: ${env_1.RELEASE_NAME}
      * time_zone: ${env_1.TIME_ZONE}
      * create: ${env_1.CREATE}
      * tickets: ${env_1.TICKETS}
      * release: ${env_1.RELEASE}
      * archive: ${env_1.ARCHIVE}
  `);
};
async function run() {
    try {
        if (env_1.DRY_RUN === 'ci') {
            printConfiguration();
            return;
        }
        const api = new api_1.API(env_1.EMAIL, env_1.API_TOKEN, env_1.PROJECT, env_1.SUBDOMAIN);
        const project = await api.loadProject();
        (0, core_1.info)(DebugMessages.PROJECT_LOADED(project.id));
        if (env_1.DRY_RUN === 'true') {
            const version = project.versions.find((v) => v.name === env_1.RELEASE_NAME);
            if (version === undefined) {
                (0, core_1.info)(DebugMessages.VERSION_NOT_FOUND(env_1.RELEASE_NAME));
            }
            else {
                (0, core_1.info)(DebugMessages.VERSION_FOUND(env_1.RELEASE_NAME));
            }
            return;
        }
        let version = project.versions.find((v) => v.name === env_1.RELEASE_NAME);
        const release = env_1.RELEASE === true;
        const archive = env_1.ARCHIVE === true;
        const localDateString = new Date().toLocaleString('en-US', { timeZone: env_1.TIME_ZONE });
        const localISOString = new Date(localDateString).toISOString();
        if (version === undefined) {
            // Create new release and ignore ARCHIVE value
            (0, core_1.info)(DebugMessages.VERSION_NOT_FOUND(env_1.RELEASE_NAME));
            if (env_1.CREATE) {
                (0, core_1.info)(DebugMessages.VERSION_WILL_BE_CREATED(env_1.RELEASE_NAME));
                const versionToCreate = {
                    name: env_1.RELEASE_NAME,
                    released: release === true && archive !== true,
                    projectId: Number(project.id),
                    ...(release && { releaseDate: localISOString }),
                    archived: false
                };
                version = await api.createVersion(versionToCreate);
                (0, core_1.info)(DebugMessages.VERSION_CREATED(env_1.RELEASE_NAME));
            }
        }
        else {
            // update release and ignore ARCHIVE value
            (0, core_1.info)(DebugMessages.VERSION_WILL_BE_UPDATED(env_1.RELEASE_NAME));
            const versionToUpdate = {
                released: release,
                ...(release && { releaseDate: localISOString }),
                archived: false
            };
            version = await api.updateVersion(version.id, versionToUpdate);
            (0, core_1.info)(DebugMessages.VERSION_UPDATED(env_1.RELEASE_NAME));
        }
        // Assign JIRA issues to Release
        if (env_1.TICKETS !== '') {
            const tickets = env_1.TICKETS.split(',');
            for (const ticket of tickets) {
                (0, core_1.info)(DebugMessages.UPDATING_TICKET(ticket));
                if (version?.id !== undefined) {
                    await api.updateIssue(ticket, version.id);
                    (0, core_1.info)(DebugMessages.TICKET_UPDATED(ticket, version.id));
                }
            }
        }
        // Now let's do the ARCHIVE business
        if (archive) {
            (0, core_1.info)(DebugMessages.VERSION_WILL_BE_ARCHIVED(env_1.RELEASE_NAME));
            // if archive then we ignore release value
            const versionToUpdate = {
                released: false,
                releaseDate: undefined,
                archived: archive
            };
            if (version?.id !== undefined) {
                version = await api.updateVersion(version.id, versionToUpdate);
                (0, core_1.info)(DebugMessages.VERSION_UPDATED(env_1.RELEASE_NAME));
            }
        }
    }
    catch (_e) {
        const e = _e;
        (0, core_1.setFailed)(e);
    }
}
run();
//# sourceMappingURL=main.js.map