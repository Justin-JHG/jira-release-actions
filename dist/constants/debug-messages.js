"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TICKET_UPDATED = exports.UPDATING_TICKET = exports.VERSION_UPDATED = exports.VERSION_CREATED = exports.VERSION_WILL_BE_ARCHIVED = exports.VERSION_WILL_BE_UPDATED = exports.VERSION_WILL_BE_CREATED = exports.VERSION_FOUND = exports.VERSION_NOT_FOUND = exports.PROJECT_LOADED = void 0;
// projects
const PROJECT_LOADED = (project_id) => `Project loaded ${project_id}`;
exports.PROJECT_LOADED = PROJECT_LOADED;
// versions
const VERSION_NOT_FOUND = (name) => `Version ${name} not found`;
exports.VERSION_NOT_FOUND = VERSION_NOT_FOUND;
const VERSION_FOUND = (name) => `Version ${name} found`;
exports.VERSION_FOUND = VERSION_FOUND;
const VERSION_WILL_BE_CREATED = (name) => `Version ${name} is going to the created`;
exports.VERSION_WILL_BE_CREATED = VERSION_WILL_BE_CREATED;
const VERSION_WILL_BE_UPDATED = (name) => `Version ${name} found and is going to be updated`;
exports.VERSION_WILL_BE_UPDATED = VERSION_WILL_BE_UPDATED;
const VERSION_WILL_BE_ARCHIVED = (name) => `Version ${name} found and is going to be archived`;
exports.VERSION_WILL_BE_ARCHIVED = VERSION_WILL_BE_ARCHIVED;
const VERSION_CREATED = (name) => `Version ${name} was successfully created`;
exports.VERSION_CREATED = VERSION_CREATED;
const VERSION_UPDATED = (name) => `Version ${name} was successfully updated`;
exports.VERSION_UPDATED = VERSION_UPDATED;
// tickets
const UPDATING_TICKET = (ticket_id) => `Going to update ticket ${ticket_id}`;
exports.UPDATING_TICKET = UPDATING_TICKET;
const TICKET_UPDATED = (ticket_id, version) => `(${version}) Ticket [${ticket_id}] was successfully updated`;
exports.TICKET_UPDATED = TICKET_UPDATED;
//# sourceMappingURL=debug-messages.js.map