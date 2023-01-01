"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const makeCallback = require('./call-back');
const helpers_1 = require("./helpers");
const controller_1 = require("./controller");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: '100000kb' }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.get('/news/login', makeCallback(controller_1.getNewsLogin, camelcase_keys_1.default));
app.get('/news/admin/login', makeCallback(controller_1.getNewsAdminLogin, camelcase_keys_1.default));
app.get('/news/admin/login/detail', makeCallback(controller_1.getNewsAdminLoginDetail, camelcase_keys_1.default));
app.put('/news/admin/login/detail', makeCallback(controller_1.createNewsAdminLoginDetail, camelcase_keys_1.default));
app.post('/news/admin/login/detail', makeCallback(controller_1.updateNewsAdminLoginDetail, camelcase_keys_1.default));
app.delete('/news/admin/login/detail', makeCallback(controller_1.deleteNewsAdminLoginDetail, camelcase_keys_1.default));
app.get('/news/footer', makeCallback(controller_1.getNewsFooter, camelcase_keys_1.default));
app.get('/news/admin/footer', makeCallback(controller_1.getNewsAdminFooter, camelcase_keys_1.default));
app.get('/news/admin/footer/detail', makeCallback(controller_1.getNewsAdminFooterDetail, camelcase_keys_1.default));
app.put('/news/admin/footer/detail', makeCallback(controller_1.createNewsAdminFooterDetail, camelcase_keys_1.default));
app.post('/news/admin/footer/detail', makeCallback(controller_1.updateNewsAdminFooterDetail, camelcase_keys_1.default));
app.delete('/news/admin/footer/detail', makeCallback(controller_1.deleteNewsAdminFooterDetail, camelcase_keys_1.default));
app.get('/news/image/:code', function (req, res) {
    const data = req.params.code;
    res.sendFile(__dirname + `/use-case/news/image/${data}`);
});
app.get('/system/param', makeCallback(controller_1.getSystemParam, camelcase_keys_1.default));
app.get('/user/module', makeCallback(controller_1.getUserModule, camelcase_keys_1.default));
app.get('/user/notification', makeCallback(controller_1.getUserNotification, camelcase_keys_1.default));
app.put('/user/notification', makeCallback(controller_1.createUserNotification, camelcase_keys_1.default));
app.post('/user/notification', makeCallback(controller_1.updateUserNotification, camelcase_keys_1.default));
app.delete('/user/notification', makeCallback(controller_1.deleteUserNotification, camelcase_keys_1.default));
app.get('/user/profile', makeCallback(controller_1.getUserProfileAll, camelcase_keys_1.default));
app.post('/user/profile', makeCallback(controller_1.updateUserProfile, camelcase_keys_1.default));
// app.get('/user/profile/image/:code', makeCallback(getImage,camelcaseKeys))
app.get('/user/profile/image/:code', function (req, res) {
    const data = req.params.code;
    console.log('data', data);
    res.sendFile(__dirname + `/use-case/user/image/${data}`);
});
app.get('/user/filter', makeCallback(controller_1.getUserFilter, camelcase_keys_1.default));
app.post('/user/filter', makeCallback(controller_1.updateUserFilter, camelcase_keys_1.default));
app.put('/user/filter', makeCallback(controller_1.createUserFilter, camelcase_keys_1.default));
app.delete('/user/filter', makeCallback(controller_1.deleteUserFilter, camelcase_keys_1.default));
app.get('/internal/user/profile', makeCallback(controller_1.getInternalUserProfile, camelcase_keys_1.default));
app.post('/internal/user/profile', makeCallback(controller_1.inputInternalUserProfile, camelcase_keys_1.default));
app.get('/internal/user/profile/data', makeCallback(controller_1.getInternalDataUserProfile, camelcase_keys_1.default));
app.put('/internal/menu', makeCallback(controller_1.createInternalMenu, camelcase_keys_1.default));
app.delete('/internal/menu', makeCallback(controller_1.deleteInternalMenu, camelcase_keys_1.default));
app.post('/internal/menu', makeCallback(controller_1.updateInternalMenu, camelcase_keys_1.default));
app.get('/internal/menu', makeCallback(controller_1.getInternalMenu, camelcase_keys_1.default));
app.put('/internal/menu/validate', makeCallback(controller_1.validasiInternalMenu, camelcase_keys_1.default));
app.post('/internal/menu/validate', makeCallback(controller_1.validasiInternalMenu, camelcase_keys_1.default));
app.delete('/internal/menu/validate', makeCallback(controller_1.validasiInternalMenu, camelcase_keys_1.default));
//endpoint check server
app.get('/server_check', function (req, res) {
    res.send({
        statusCode: 200,
        body: {
            response_code: 200,
            data: 'general service good'
        }
    });
});
app.use((err, req, res, next) => {
    (0, helpers_1.handleError)(err, res);
});
exports.default = app;
