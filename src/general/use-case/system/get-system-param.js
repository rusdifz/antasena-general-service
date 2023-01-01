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
function makeGetSystemParam({ systemDb, moment }) {
    return function getSystemParam(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield systemDb.getDataSystemParam(body);
                let result;
                if (data.status == true) {
                    let arrayParam = yield Promise.all(data.data.map(param => {
                        const dataParam = {
                            [param.key_value]: param.value
                        };
                        return dataParam;
                    }));
                    const paramString = JSON.stringify(arrayParam);
                    const paramChange = paramString.replace(/{|}/gi, "").replace(/\[/gi, "{").replace(/]/gi, "}");
                    const paramObject = JSON.parse(paramChange);
                    const dataResponse = Object.assign({ systemdatetime: moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss.ms') }, paramObject);
                    result = {
                        status: true,
                        responseCode: 200,
                        data: dataResponse
                    };
                }
                else {
                    result = data;
                }
                return result;
            }
            catch (error) {
                throw new Error('usecase-getSystemParam' + error);
            }
        });
    };
}
exports.default = makeGetSystemParam;
