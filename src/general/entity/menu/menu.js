"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildMakeMenu(moment) {
    return function makeMenu({ id = '', moduleId = '', menuId = '', menuCategory = '', menuIcon = '', menuDesc = '', menuDescGlob = '', menuType = '', menuParent = '', menuUrl = '', menuOrder = '', menuPeriod = '', disabledStatus = 0, disabledUser = '', disabledTime = '', usernameToken = '', createdTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'), updatedTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss') } = {}) {
        return Object.freeze({
            getId: () => id,
            getModuleId: () => moduleId,
            getMenuId: () => menuId,
            getMenuCategory: () => menuCategory,
            getMenuIcon: () => menuIcon,
            getMenuDesc: () => menuDesc,
            getMenuDescGlob: () => menuDescGlob,
            getMenuType: () => menuType,
            getMenuParent: () => menuParent,
            getMenuUrl: () => menuUrl,
            getMenuOrder: () => menuOrder,
            getMenuPeriod: () => menuPeriod,
            getDisabledStatus: () => disabledStatus,
            getDisabledUser: () => disabledUser,
            getDisabledTime: () => disabledTime,
            getUsernameToken: () => usernameToken,
            getCreatedTime: () => createdTime,
            getUpdatedTime: () => updatedTime
        });
    };
}
exports.default = buildMakeMenu;
