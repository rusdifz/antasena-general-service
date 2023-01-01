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
function makeUpdateUserProfileRole({ userDb, makeUser }) {
    return function updateUserProfileRole(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = {
                    moduleId: body.moduleId,
                    roleId: body.roleData.roleId,
                    username: body.username
                };
                const validasiRole = yield makeUser(role);
                const result = yield userDb.updateDataUserProfileRole(validasiRole);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    };
}
exports.default = makeUpdateUserProfileRole;
