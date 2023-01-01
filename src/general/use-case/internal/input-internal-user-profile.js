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
function makeInputInternalUserProfile({ internalDb, moment }) {
    return function inputInternalUserProfile(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkData = yield internalDb.checkDataInternalUserProfile(body);
                console.log('checkData', checkData);
                let result;
                if (checkData.responseCode == 200) {
                    console.log('masuk a');
                    const entity = {
                        moduleId: body.moduleId,
                        username: body.username,
                        key: body.key,
                        cat: body.cat,
                        value: body.value,
                        time: moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss')
                    };
                    if (checkData.data == true) {
                        console.log('update');
                        result = yield internalDb.updateDataInternalUserProfile(entity);
                    }
                    else {
                        console.log('create');
                        result = yield internalDb.createDataInternalUserProfile(entity);
                    }
                }
                else {
                    console.log('false');
                    result = {
                        status: false,
                        responseCode: checkData.responseCode,
                        data: checkData.data
                    };
                }
                console.log('res', result);
                return result;
            }
            catch (error) {
                throw new Error('usecase-inputInternalUserProfile ' + error);
            }
        });
    };
}
exports.default = makeInputInternalUserProfile;
