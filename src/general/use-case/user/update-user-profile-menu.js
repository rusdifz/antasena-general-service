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
function makeUpdateUserProfileMenu({ userDb, makeUser }) {
    return function updateUserProfileMenu(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuArr = body.menu;
                let result = yield Promise.all(menuArr.map((data) => __awaiter(this, void 0, void 0, function* () {
                    const menu = {
                        moduleId: body.moduleId,
                        username: body.username,
                        menuId: data.menuId,
                        selectMenu: data.selected
                    };
                    const validasiMenu = yield makeUser(menu);
                    const input = yield userDb.updateDataUserProfileMenu(validasiMenu);
                    return input;
                })));
                return result[0];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    };
}
exports.default = makeUpdateUserProfileMenu;
