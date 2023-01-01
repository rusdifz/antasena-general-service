"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function makeUpdateUserProfileSetting({ userDb, makeUser }) {
    return function updateUserProfileSetting(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const setting = {
                    moduleId: body.moduleId,
                    username: body.username,
                    language: body.userSetting.language.id,
                    theme: body.userSetting.theme.colorId
                };
                const validasiSetting = yield makeUser(setting);
                const dataSetting = yield userDb.updateDataUserProfileSetting(validasiSetting);
                const settingPage = body.userSetting.rowOfPage;
                let dataSettingRpp = yield Promise.all(settingPage.map((set) => __awaiter(this, void 0, void 0, function* () {
                    const page = {
                        moduleId: body.moduleId,
                        username: body.username,
                        valuePage: set.value,
                        selectRpp: set.selected,
                        order: set.order
                    };
                    const validasiPage = yield makeUser(page);
                    const inputSettingRpp = yield userDb.updateDataUserProfileSettingRpp(validasiPage);
                    return inputSettingRpp;
                })));
                let responseCode;
                let message;
                let status;
                if (dataSetting.status == true && dataSettingRpp[0].status == true) {
                    status = true;
                    responseCode = 200;
                    message = 'User setting updated successfully.';
                }
                else {
                    status = false;
                    responseCode = 400;
                    message = 'Incorrect input';
                }
                const result = {
                    status: status,
                    responseCode: responseCode,
                    data: message
                };
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    };
}
exports.default = makeUpdateUserProfileSetting;
