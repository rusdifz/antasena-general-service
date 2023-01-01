"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildMakeUserFilter(moment) {
    return function makeUserFilter({ username = '', moduleId = '', menuId = '', id = '', filterName = '', filterSql = '', filterJson = '', uiJson = '', tabName = '', createdTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'), updatedTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss') } = {}) {
        const sqlFilter = filterSql.replace(/'/g, "''");
        console.log('sql', sqlFilter);
        //   if(statusValid == 'true'){
        return Object.freeze({
            //   statusValid: statusValid,
            getUsername: () => username,
            getModuleId: () => moduleId,
            getMenuId: () => menuId,
            getId: () => id,
            getFilterName: () => filterName,
            getFilterSql: () => sqlFilter,
            getFilterJson: () => filterJson,
            getUiJson: () => uiJson,
            getTabName: () => tabName,
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
exports.default = buildMakeUserFilter;
