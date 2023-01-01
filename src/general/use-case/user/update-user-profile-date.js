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
function makeUpdateUserProfileDate({ userDb, makeUser }) {
    return function updateUserProfileDate(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = Object.assign(Object.assign({}, body), { dateValue: body.dateData.dateValue, dateType: body.dateData.dateType });
                const validasiDate = yield makeUser(date);
                const result = yield userDb.updateDataUserProfileDate(validasiDate);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    };
}
exports.default = makeUpdateUserProfileDate;
