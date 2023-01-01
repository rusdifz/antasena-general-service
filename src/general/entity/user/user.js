"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildMakeUser(moment) {
    return function makeUser({ moduleId = '', username = '', usernameToken = '', roleId = '', periodId = '', bank = '', branchId = '', dateValue = '', dateType = '', img = '', nickname = '', language = '', theme = '', valuePage = '', selectRpp = '', order = '', menuId = '', selectMenu = '', createdTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'), updatedTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss') } = {}) {
        let bankwide;
        let selectedRpp;
        let selectedMenu;
        if (bank == 'yes') {
            bankwide = '1';
        }
        else {
            bankwide = '0';
        }
        if (selectRpp == 'yes') {
            selectedRpp = '1';
        }
        else {
            selectedRpp = '0';
        }
        if (selectMenu == 'inc') {
            selectedMenu = '-1';
        }
        else if (selectMenu == 'no') {
            selectedMenu = '0';
        }
        else {
            selectedMenu = '1';
        }
        //   let statusValid
        //   let dataNotValid = new Object()
        //   if(!branchId || branchId == ''){
        //     dataNotValid['branch_id'] = 'branch id must be filled'
        //   }
        //   if(!branchName || branchName == ''){
        //     dataNotValid['branch_name'] = 'branch name must be filled'
        //   }
        //   if(JSON.stringify(dataNotValid) === '{}' || dataNotValid === '{}' || JSON.stringify(dataNotValid) === JSON.stringify({})){
        //     statusValid = 'true'
        //   }else{
        //     statusValid = 'false'
        //   }
        //   if(statusValid == 'true'){
        return Object.freeze({
            //   statusValid: statusValid,
            getModuleId: () => moduleId,
            getUsername: () => username,
            getUsernameToken: () => usernameToken,
            getRoleId: () => roleId,
            getPeriodId: () => periodId,
            getBankwide: () => bankwide,
            getBranchId: () => branchId,
            getDateValue: () => dateValue,
            getDateType: () => dateType,
            getImg: () => img,
            getNickname: () => nickname,
            getLanguage: () => language,
            getTheme: () => theme,
            getValuePage: () => valuePage,
            getSelectedRpp: () => selectedRpp,
            getOrder: () => order,
            getMenuId: () => menuId,
            getSelectedMenu: () => selectedMenu,
            getCreatedTime: () => createdTime,
            getUpdatedTime: () => updatedTime
        });
        //   }else{
        //     return Object.freeze({
        //       statusValid: statusValid, 
        //       data: dataNotValid
        //     })
        //   }
    };
}
exports.default = buildMakeUser;
