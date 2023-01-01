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
function makeGetUserProfile({ userDb }) {
    return function getUserProfile(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getProfileData = yield userDb.getDataUserProfileData(body);
                console.log('get', getProfileData.data);
                let result;
                if (getProfileData.status == "filled") {
                    const getRole = yield userDb.getDataUserRole(body);
                    const getPeriod = yield userDb.getDataUserPeriod(body);
                    const getBranch = yield userDb.getDataUserBranch(body);
                    const getDate = yield userDb.getDataUserDate(body);
                    const getSettingLanguage = yield userDb.getDataUserSettingLanguage(body);
                    const getSettingTheme = yield userDb.getDataUserSettingTheme(body);
                    const getSettingPage = yield userDb.getDataUserSettingPage(body);
                    const getRoleMenu = yield userDb.getDataUserRoleMenu(body);
                    let menu = [];
                    if (getRole.status == true && getPeriod.status == true && getBranch.status == true && getDate.status == true && getSettingLanguage.status == true && getSettingTheme.status == true && getSettingPage.status == true && getRoleMenu.responseCode == 200) {
                        console.log('masuk sini ');
                        if (getRoleMenu.status == "filled") {
                            yield Promise.all(getRoleMenu.data.map((data) => __awaiter(this, void 0, void 0, function* () {
                                const menuParent = yield userDb.getDataUserMenuParent(Object.assign(Object.assign({}, body), { roleId: data.role_id }));
                                let menu2 = yield Promise.all(menuParent.map((dataParent) => __awaiter(this, void 0, void 0, function* () {
                                    const menuChild = yield userDb.getDataUserMenuChild(Object.assign(Object.assign({}, body), { menuId: dataParent.menuId, roleId: data.role_id }));
                                    let child = yield Promise.all(menuChild.map((dataChild) => __awaiter(this, void 0, void 0, function* () {
                                        if (dataChild.menuType == 'parent') {
                                            const childNested = yield userDb.getDataUserMenuChild(Object.assign(Object.assign({}, body), { menuId: dataChild.menuId, roleId: data.role_id }));
                                            // console.log('child', childNested);
                                            const dataChildNested = Object.assign(Object.assign({}, dataChild), { menuChildren: childNested });
                                            return dataChildNested;
                                        }
                                        else {
                                            return dataChild;
                                        }
                                    })));
                                    if (child.length == 0) {
                                        const parentMenu = {
                                            menuId: dataParent.menuId,
                                            menuIcon: dataParent.menuIcon,
                                            menuDesc: dataParent.menuDesc,
                                            menuDescGlob: dataParent.menuDescGlob,
                                            menuType: dataParent.menuType,
                                            menuParent: dataParent.menuParent,
                                            menuUrl: dataParent.menuUrl,
                                            menuPeriod: dataParent.menuPeriod,
                                            fav: dataParent.fav,
                                            access: {
                                                view: dataParent.access_view,
                                                create: dataParent.access_create,
                                                update: dataParent.access_update,
                                                delete: dataParent.access_delete
                                            }
                                        };
                                        return parentMenu;
                                    }
                                    else {
                                        const parentMenu = {
                                            menuId: dataParent.menuId,
                                            menuIcon: dataParent.menuIcon,
                                            menuDesc: dataParent.menuDesc,
                                            menuDescGlob: dataParent.menuDescGlob,
                                            menuType: dataParent.menuType,
                                            menuParent: dataParent.menuParent,
                                            menuUrl: dataParent.menuUrl,
                                            menuPeriod: dataParent.menuPeriod,
                                            fav: dataParent.fav,
                                            access: {
                                                view: dataParent.access_view,
                                                create: dataParent.access_create,
                                                update: dataParent.access_update,
                                                delete: dataParent.access_delete
                                            },
                                            menuChildren: child
                                        };
                                        return parentMenu;
                                    }
                                })));
                                const menuData = {
                                    roleId: data.role_id,
                                    menu: menu2
                                };
                                // return menuData
                                menu.push(menuData);
                            })));
                        }
                        else {
                            menu = [];
                        }
                        const datares = {
                            roleData: getRole.data,
                            periodData: getPeriod.data,
                            branchData: {
                                bankwide: getBranch.dataBankwide.value,
                                branch: getBranch.data
                            },
                            dateData: getDate.data,
                            menuData: menu,
                            userData: {
                                img: getProfileData.data.img,
                                name: getProfileData.data.username,
                                nickname: getProfileData.data.nickname
                            },
                            userSetting: {
                                rowOfPage: getSettingPage.data,
                                language: getSettingLanguage.data,
                                theme: getSettingTheme.data
                            }
                        };
                        result = {
                            status: true,
                            responseCode: 200,
                            data: datares
                        };
                    }
                    else {
                        if (getRole.status == false) {
                            result = getRole;
                        }
                        else if (getPeriod.status == false) {
                            result = getPeriod;
                        }
                        else if (getBranch.status == false) {
                            result = getBranch;
                        }
                        else if (getDate.status == false) {
                            result = getDate;
                        }
                        else if (getSettingLanguage.status == false) {
                            result = getSettingLanguage;
                        }
                        else if (getSettingTheme.status == false) {
                            result = getSettingTheme;
                        }
                        else if (getSettingPage.status == false) {
                            result = getSettingPage;
                        }
                        else {
                            result = getRoleMenu;
                        }
                    }
                }
                else if (getProfileData.status == false) {
                    result = getProfileData;
                }
                else {
                    result = {
                        status: true,
                        responseCode: 200,
                        data: []
                    };
                }
                return result;
            }
            catch (error) {
                throw new Error('usecase-getUserProfileAll ' + error);
            }
        });
    };
}
exports.default = makeGetUserProfile;
