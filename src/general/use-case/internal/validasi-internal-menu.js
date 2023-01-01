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
function makeValidasiInternalMenu({ internalDb, makeMenu }) {
    return function validasiInternalMenu(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (body.method.toLowerCase() == 'delete') {
                    const validasi = yield internalDb.validasiMenuDelete(body);
                    if (validasi.status == true) {
                        result = {
                            status: true,
                            responseCode: 200,
                            data: "OK"
                        };
                    }
                    else {
                        result = {
                            status: false,
                            responseCode: 406,
                            data: validasi.data
                        };
                    }
                }
                else {
                    const entity = yield makeMenu(body);
                    let validasi;
                    if (body.method.toLowerCase() == 'put') {
                        validasi = yield internalDb.validasiMenuCreate(entity);
                    }
                    else {
                        validasi = yield internalDb.validasiMenuUpdate(entity);
                    }
                    if (validasi.status == true) {
                        result = {
                            status: true,
                            responseCode: 200,
                            data: "OK"
                        };
                    }
                    else {
                        result = {
                            status: false,
                            responseCode: 406,
                            data: validasi.data
                        };
                    }
                }
            }
            catch (error) {
                throw new Error('usecase-validasiInternalMenu ' + error);
            }
        });
    };
}
exports.default = makeValidasiInternalMenu;
