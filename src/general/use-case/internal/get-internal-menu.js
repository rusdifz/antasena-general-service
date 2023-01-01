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
function makeGetInternalMenu({ internalDb, moment }) {
    return function getInternalMenu(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getMenu = yield internalDb.getDataInternalMenu(body);
                let result;
                if (getMenu.status == true) {
                    let dataMenu = [];
                    if (getMenu.data.length > 0) {
                        getMenu.data.map(data => {
                            let updatedTime;
                            if (data.updated_time == null) {
                                updatedTime = data.updated_time;
                            }
                            else {
                                updatedTime = moment(data.updated_time).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss');
                            }
                            const menu = {
                                id: data.id,
                                moduleId: data.module_id,
                                menuId: data.menu_id,
                                menuCategory: data.menu_category,
                                menuIcon: data.menu_icon,
                                menuDesc: data.menu_desc,
                                menuDescGlob: data.menu_desc_glob,
                                menutype: data.menu_type,
                                menuParent: data.menu_parent,
                                menuUrl: data.menu_url,
                                menuOrder: data.menu_order,
                                menuPeriod: data.menu_period,
                                disabledStatus: data.disabled_status,
                                disabledUser: data.disabled_user,
                                disabledTime: data.disabled_time,
                                createdUser: data.created_user,
                                createdTime: moment(data.created_time).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'),
                                updatedUser: data.updated_user,
                                updatedTime: updatedTime
                            };
                            dataMenu.push(menu);
                        });
                    }
                    result = {
                        status: true,
                        responseCode: 200,
                        data: dataMenu
                    };
                }
                else {
                    result = getMenu;
                }
                return result;
            }
            catch (error) {
                throw new Error('usecase-getInternalMenu ' + error);
            }
        });
    };
}
exports.default = makeGetInternalMenu;
