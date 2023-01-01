"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildMakeNotification(moment) {
    return function makeNotification({ id = '', moduleId = '', username = '', datetime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'), title = '', titleGlob = '', message = '', messageGlob = '', status = 0, usernameToken = '', createdTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'), updatedTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss') } = {}) {
        return Object.freeze({
            getId: () => id,
            getModuleId: () => moduleId,
            getUsername: () => username,
            getDatetime: () => datetime,
            getTitle: () => title,
            getTitleGlob: () => titleGlob,
            getMessage: () => message,
            getMessageGlob: () => messageGlob,
            getStatus: () => status,
            getUsernameToken: () => usernameToken,
            getCreatedTime: () => createdTime,
            getUpdatedTime: () => updatedTime
        });
    };
}
exports.default = buildMakeNotification;
