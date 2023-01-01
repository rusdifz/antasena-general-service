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
function makeUserDb({ Query, QueryGet, QueryTransaction }) {
    return Object.freeze({
        getDataUserModule,
        getDataUserNotification,
        getDataUserRole,
        getDataUserPeriod,
        getDataUserBranch,
        getDataUserDate,
        getDataUserProfileData,
        getDataUserSettingLanguage,
        getDataUserSettingPage,
        getDataUserSettingTheme,
        getDataUserRoleMenu,
        getDataUserMenuParent,
        getDataUserMenuChild,
        getDataUserFilter,
        createDataUserFilter,
        createDataUserNotification,
        updateDataUserNotification,
        updateDataUserProfileRole,
        updateDataUserProfilePeriod,
        updateDataUserProfileBranchBankwide,
        updateDataUserProfileBranchCode,
        updateDataUserProfileDate,
        updateDataUserProfileData,
        updateDataUserProfileSetting,
        updateDataUserProfileSettingRpp,
        updateDataUserProfileMenu,
        updateDataUserFilter,
        deleteDataUserNotification,
        deleteDataUserFilter
    });
    function getDataUserModule(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let insert = body.username;
                        let sql = `SELECT m_module.module_id as 'moduleId', m_module.module_name as 'moduleName', 
                    m_module.module_desc as 'moduleDesc', m_module.module_order as 'moduleOrder' FROM m_module
                    LEFT JOIN m_user_module on m_module.module_id=m_user_module.module_id
                    WHERE m_user_module.username = '${insert}'`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, responseCode: 200, data: result.data.recordset });
                            }
                            else {
                                resolve({ status: true, responseCode: 200, data: [] });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserModule ' + error));
                    }
                });
            });
        });
    }
    function getDataUserNotification(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let resNotif;
                        if (body.fetch == 'old') {
                            console.log('old');
                            let where = `WHERE module_id = '${body.moduleId}' AND username = '${body.username}'`;
                            if (body.lastId > 0) {
                                where += `AND id < ${body.lastId}`;
                            }
                            let sql = `SELECT TOP 10 id, datetime, title, title_glob, message, message_glob, CASE WHEN status = 0 THEN 'unread'
                      else 'read' end status from m_notification ${where} ORDER BY id DESC`;
                            let sqlCount = `SELECT COUNT(id) as 'all' FROM m_notification WHERE module_id = '${body.moduleId}' AND username = '${body.username}'`;
                            let result = yield QueryGet(sql);
                            let resultCount = yield Query(sqlCount);
                            if (result.status == true) {
                                if (result.data.recordset.length > 0) {
                                    resNotif = { status: true, data: result.data.recordset, countAll: resultCount.recordset[0].all };
                                }
                                else {
                                    resNotif = { status: true, data: [], countAll: resultCount.recordset[0].all };
                                }
                            }
                            else {
                                resNotif = { status: false, responseCode: 500, data: 'SQL ' + result.data.number };
                            }
                        }
                        else {
                            console.log('new');
                            let sqlCount = `SELECT COUNT(id) as 'all' FROM m_notification WHERE module_id = '${body.moduleId}' AND username = '${body.username}'`;
                            if (body.lastId > 0) {
                                let sql = `SELECT TOP 10 id, datetime, title, title_glob, message, message_glob, CASE WHEN status = 0 THEN 'unread'
                        else 'read' end status from m_notification WHERE module_id = '${body.moduleId}' AND username = '${body.username}' AND id > ${body.lastId} ORDER BY id DESC`;
                                let result = yield QueryGet(sql);
                                let resultCount = yield Query(sqlCount);
                                if (result.status == true) {
                                    if (result.data.recordset.length > 0) {
                                        resNotif = { status: true, data: result.data.recordset, countAll: resultCount.recordset[0].all };
                                    }
                                    else {
                                        resNotif = { status: true, data: [], countAll: resultCount.recordset[0].all };
                                    }
                                }
                                else {
                                    resNotif = { status: false, responseCode: 500, data: 'SQL ' + result.data.number };
                                }
                            }
                            else {
                                let resultCount = yield Query(sqlCount);
                                resNotif = { status: true, data: [], countAll: resultCount.recordset[0].all };
                            }
                        }
                        resolve(resNotif);
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserNotification ' + error));
                    }
                });
            });
        });
    }
    function getDataUserRole(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let insert = {
                            username: body.username,
                            moduleId: body.moduleId
                        };
                        let sql = `SELECT mr.role_id AS 'roleId', mr.role_name AS 'roleName', CASE WHEN mus.value is not null THEN 'yes' ELSE 'no' 
                    END selected FROM m_role mr LEFT JOIN m_user_role mur ON mr.module_id = mur.module_id AND mr.role_id = mur.role_id
                    LEFT JOIN (SELECT module_id, username, value from m_user_selection mus WHERE mus.cat_value='Role') 
                    mus on mur.module_id = mus.module_id AND mur.username = mus.username AND mur.role_id = mus.value
                    where mr.module_id = '${insert.moduleId}' and mur.username = '${insert.username}'`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, responseCode: 200, data: result.data.recordset });
                            }
                            else {
                                resolve({ status: true, responseCode: 200, data: [] });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserRole ' + error));
                    }
                });
            });
        });
    }
    function getDataUserPeriod(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let insert = {
                            username: body.username,
                            moduleId: body.moduleId
                        };
                        let sql = `SELECT ml.value AS 'periodId', ml.value_desc AS 'periodName', CASE WHEN mus.value is
                    not null then 'yes' else 'no' end selected FROM m_lookup ml
                    LEFT JOIN (SELECT mus.value FROM m_user_selection mus WHERE mus.module_id = '${insert.moduleId}' 
                    AND key_value = 'Period' AND mus.username = '${insert.username}') mus ON ml.value = mus.value
                    WHERE ml.cat_value = 'User Selection' AND ml.key_value = 'Period'`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, responseCode: 200, data: result.data.recordset });
                            }
                            else {
                                resolve({ status: true, responseCode: 200, data: [] });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserPeriod ' + error));
                    }
                });
            });
        });
    }
    function getDataUserBranch(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let insert = {
                            username: body.username,
                            moduleId: body.moduleId
                        };
                        let sql = `select m_branch_rpt.branch_id as 'branchId', m_branch_rpt.branch_name as 'branchName', case when
                      m_user_selection.value is not null then 'yes' else 'no' end selected from
                      m_user_branch_rpt left join m_branch_rpt on
                      m_branch_rpt.module_id=m_user_branch_rpt.module_id and
                      m_user_branch_rpt.branch_id=m_branch_rpt.branch_id left join (select * from
                      m_user_selection where m_user_selection.key_value='Branch' and
                      m_user_selection.username = '${insert.username}') m_user_selection on
                      m_branch_rpt.module_id=m_user_selection.module_id and
                      m_branch_rpt.branch_id=m_user_selection.value where
                      m_user_branch_rpt.username = '${insert.username}' and m_user_branch_rpt.module_id = '${insert.moduleId}'`;
                        let sqlBankwide = `SELECT CASE WHEN value = '1' THEN 'yes' ELSE 'no' end value FROM M_User_Selection 
                            WHERE module_id = '${insert.moduleId}' AND username = '${insert.username}' 
                            AND cat_value = 'Branch' AND key_value = 'Bankwide'`;
                        let result = yield QueryGet(sql);
                        let resultBankwide = yield QueryGet(sqlBankwide);
                        if (result.status == true && resultBankwide.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, responseCode: 200, data: result.data.recordset, dataBankwide: resultBankwide.data.recordset[0] });
                            }
                            else {
                                resolve({ status: true, responseCode: 200, data: [], dataBankwide: [] });
                            }
                        }
                        else {
                            if (result.status == false) {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + resultBankwide.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserBranch ' + error));
                    }
                });
            });
        });
    }
    function getDataUserDate(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let insert = {
                            username: body.username,
                            moduleId: body.moduleId
                        };
                        let sql = `SELECT key_value AS 'dateType', value AS 'dateValue' FROM m_user_selection WHERE
                    cat_value = 'Date' and module_id = '${insert.moduleId}' and username = '${insert.username}'`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, responseCode: 200, data: result.data.recordset });
                            }
                            else {
                                resolve({ status: true, responseCode: 200, data: [] });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserDate ' + error));
                    }
                });
            });
        });
    }
    function getDataUserProfileData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let insert = body.username;
                        let sql = `SELECT username, nickname, img from m_user_profile where username = '${insert}'`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: 'filled', responseCode: 200, data: result.data.recordset[0] });
                            }
                            else {
                                resolve({ status: 'empty', responseCode: 200, data: {} });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserProfileData ' + error));
                    }
                });
            });
        });
    }
    function getDataUserSettingLanguage(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let insert = {
                            username: body.username,
                            moduleId: body.moduleId
                        };
                        let sql = `SELECT ml.value as 'id', ml.value_desc as 'name', CASE WHEN mus.lang is
                    not null then 'yes' else 'no' end selected FROM m_lookup ml
                    LEFT JOIN (SELECT * FROM m_user_setting mus where module_id = '${insert.moduleId}' and
                    username = '${insert.username}') mus on ml.value = mus.lang
                    where ml.cat_value = 'User Setting' and ml.key_value = 'Lang'`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, responseCode: 200, data: result.data.recordset });
                            }
                            else {
                                resolve({ status: true, responseCode: 200, data: [] });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserSettinglanguage ' + error));
                    }
                });
            });
        });
    }
    function getDataUserSettingTheme(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let insert = {
                            username: body.username,
                            moduleId: body.moduleId
                        };
                        let sql = `SELECT ml.value as 'colorId', ml.value_desc as 'colorName', CASE WHEN mus.lang is
                    not null then 'yes' else 'no' end selected FROM m_lookup ml
                    LEFT JOIN (SELECT * FROM m_user_setting mus WHERE module_id = '${insert.moduleId}' and
                    username = '${insert.username}') mus ON ml.value = mus.theme
                    WHERE ml.cat_value = 'User Setting' AND ml.key_value = 'Theme'`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, responseCode: 200, data: result.data.recordset });
                            }
                            else {
                                resolve({ status: true, responseCode: 200, data: [] });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserSettingTheme ' + error));
                    }
                });
            });
        });
    }
    function getDataUserSettingPage(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let insert = body.username;
                        let sql = `SELECT seq_no as 'order', row_amount as 'value', CASE WHEN selected = 0 THEN 'no' ELSE 'yes' end selected 
                    from m_user_setting_rpp where username = '${insert}' order by seq_no`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, responseCode: 200, data: result.data.recordset });
                            }
                            else {
                                resolve({ status: true, responseCode: 200, data: [] });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserSettingPage ' + error));
                    }
                });
            });
        });
    }
    function getDataUserRoleMenu(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let insert = {
                            username: body.username,
                            moduleId: body.moduleId
                        };
                        let sql = `SELECT mrm.role_id FROM m_role_menu mrm LEFT JOIN m_user_role mur ON
                    mrm.role_id = mur.role_id LEFT JOIN m_menu mm ON mrm.menu_id = mm.menu_id
                    WHERE mrm.module_id = '${insert.moduleId}' AND mur.username = '${insert.username}'
                    GROUP BY mrm.role_id ORDER BY mrm.role_id DESC`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: "filled", responseCode: 200, data: result.data.recordset });
                            }
                            else {
                                resolve({ status: "empty", responseCode: 200, data: [] });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserSettingRoleMenu ' + error));
                    }
                });
            });
        });
    }
    function getDataUserMenuParent(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let insert = {
                            username: body.username,
                            moduleId: body.moduleId,
                            roleId: body.roleId
                        };
                        let sql = `SELECT mm.menu_id as 'menuId', mm.menu_icon as 'menuIcon', mm.menu_desc as 'menuDesc',
                    mm.menu_desc_glob as 'menuDescGlob', mm.menu_type as 'menuType', mm.menu_parent as 'menuParent',  mm.menu_url as 'menuUrl', mm.menu_period as 'menuPeriod',
                    case when isnull(mum.selected, 0) = 0 then 'no' when mum.selected = -1 then 'inc' else 'yes' end as fav,
                    m_user_access.access_view, m_user_access.access_create, m_user_access.access_update, m_user_access.access_delete
                    FROM m_role_menu LEFT JOIN m_user_role mur ON
                    m_role_menu.role_id = mur.role_id AND m_role_menu.module_id = mur.module_id
                    LEFT JOIN m_menu mm ON m_role_menu.menu_id = mm.menu_id
                    LEFT JOIN (select * from m_user_menu mum where module_id = '${insert.moduleId}' AND
                    username = '${insert.username}') mum ON mm.menu_id = mum.menu_id 
                    LEFT JOIN (select m_role_menu.menu_id, m_role_menu.role_id, case when
                    m_role_menu.access_view is null then null when m_role_menu.access_view=1 and
                    m_user_access.access_view=1 then 1 else 0 end access_view, case when
                    m_role_menu.access_create is null then null when m_role_menu.access_create=1 
                    and m_user_access.access_create=1 then 1 else 0 end access_create, case when
                    m_role_menu.access_update is null then null when m_role_menu.access_update=1 
                    and m_user_access.access_update=1 then 1 else 0 end access_update, case when
                    m_role_menu.access_delete is null then null when m_role_menu.access_delete=1 
                    and m_user_access.access_delete=1 then 1 else 0 end access_delete from
                    adp_main.dbo.m_role_menu left join (select module_id, username, access_view,
                    access_create, access_update, access_delete from adp_main.dbo.m_user_access 
                    where module_id = '${insert.moduleId}' and username = '${insert.username}') m_user_access on
                    m_role_menu.module_id=m_user_access.module_id)m_user_access on
                    m_role_menu.menu_id=m_user_access.menu_id and
                    m_role_menu.role_id=m_user_access.role_id
                    WHERE  m_role_menu.module_id = '${insert.moduleId}' AND  m_role_menu.role_id = '${insert.roleId}'
                    AND mur.username = '${insert.username}' AND mm.menu_type = 'parent' AND mm.menu_parent = '' ORDER by mm.menu_id ASC`;
                        let result = yield Query(sql);
                        if (result.recordset.length > 0) {
                            resolve(result.recordset);
                        }
                        else {
                            resolve([]);
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserMenuParent ' + error));
                    }
                });
            });
        });
    }
    function getDataUserMenuChild(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let insert = {
                            username: body.username,
                            moduleId: body.moduleId,
                            idParent: body.menuId,
                            roleId: body.roleId
                        };
                        let sql = `SELECT mm.menu_id as 'menuId', mm.menu_icon as 'menuIcon', mm.menu_desc as 'menuDesc',
                    mm.menu_desc_glob as 'menuDescGlob', mm.menu_type as 'menuType', mm.menu_parent as 'menuParent',  mm.menu_url as 'menuUrl', mm.menu_period as 'menuPeriod',
                    case when isnull(mum.selected, 0) = 0 then 'no' when mum.selected = -1 then 'inc' else 'yes' end as fav,
                    m_user_access.access_view, m_user_access.access_create, m_user_access.access_update, m_user_access.access_delete
                    FROM m_role_menu LEFT JOIN m_user_role mur ON
                    m_role_menu.role_id = mur.role_id AND m_role_menu.module_id = mur.module_id
                    LEFT JOIN m_menu mm ON m_role_menu.menu_id = mm.menu_id
                    LEFT JOIN (select * from m_user_menu mum where module_id = '${insert.moduleId}' AND
                    username = '${insert.username}') mum ON mm.menu_id = mum.menu_id 
                    LEFT JOIN (select m_role_menu.menu_id, m_role_menu.role_id, case when
                    m_role_menu.access_view is null then null when m_role_menu.access_view=1 and
                    m_user_access.access_view=1 then 1 else 0 end access_view, case when
                    m_role_menu.access_create is null then null when m_role_menu.access_create=1 
                    and m_user_access.access_create=1 then 1 else 0 end access_create, case when
                    m_role_menu.access_update is null then null when m_role_menu.access_update=1 
                    and m_user_access.access_update=1 then 1 else 0 end access_update, case when
                    m_role_menu.access_delete is null then null when m_role_menu.access_delete=1 
                    and m_user_access.access_delete=1 then 1 else 0 end access_delete from
                    adp_main.dbo.m_role_menu left join (select module_id, username, access_view,
                    access_create, access_update, access_delete from adp_main.dbo.m_user_access 
                    where module_id = '${insert.moduleId}' and username = '${insert.username}') m_user_access on
                    m_role_menu.module_id=m_user_access.module_id)m_user_access on
                    m_role_menu.menu_id=m_user_access.menu_id and
                    m_role_menu.role_id=m_user_access.role_id
                    WHERE  m_role_menu.module_id = '${insert.moduleId}' AND  m_role_menu.role_id = '${insert.roleId}' AND mur.username = '${insert.username}' 
                    AND mm.menu_parent != '' AND mm.menu_parent = '${insert.idParent}' ORDER BY mm.menu_id ASC`;
                        let result = yield Query(sql);
                        if (result.recordset.length > 0) {
                            const data = yield Promise.all(result.recordset.map(child => {
                                let menuIcon;
                                if (child.fav == 'yes') {
                                    menuIcon = "";
                                }
                                else {
                                    menuIcon = child.menuIcon;
                                }
                                const menu = {
                                    menuId: child.menuId,
                                    menuIcon: menuIcon,
                                    menuDesc: child.menuDesc,
                                    menuDescGlob: child.menuDescGlob,
                                    menuType: child.menuType,
                                    menuParent: child.menuParent,
                                    menuUrl: child.menuUrl,
                                    menuPeriod: child.menuPeriod,
                                    fav: child.fav,
                                    access: {
                                        view: child.access_view,
                                        create: child.access_create,
                                        update: child.access_update,
                                        delete: child.access_delete
                                    }
                                };
                                return menu;
                            }));
                            resolve(data);
                        }
                        else {
                            resolve([]);
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserMenuChild ' + error));
                    }
                });
            });
        });
    }
    function getDataUserFilter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let where = `WHERE module_id = '${body.moduleId}' AND username = '${body.username}' `;
                        if (body.menuId) {
                            where += ` AND menu_id = '${body.menuId}'`;
                        }
                        if (body.tabName) {
                            where += ` AND tab_name = '${body.tabName}'`;
                        }
                        let sql = `SELECT id, filter_name as 'filterName', filter_sql as 'filterSql', filter_json as 'filterJson', 
                    ui_json as 'uiJson', tab_name as 'tabName' FROM m_user_filter ${where}`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, responseCode: 200, data: result.data.recordset });
                            }
                            else {
                                resolve({ status: true, responseCode: 200, data: [] });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataUserFilter ' + error));
                    }
                });
            });
        });
    }
    function createDataUserFilter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `INSERT INTO m_user_filter ( module_id, username, menu_id, filter_name, filter_sql, filter_json, 
                    ui_json, tab_name, created_user, created_time) 
                    OUTPUT inserted.id
                    VALUES ( '${body.getModuleId()}', '${body.getUsername()}', '${body.getMenuId()}', 
                             '${body.getFilterName()}', '${body.getFilterSql()}','${body.getFilterJson()}',
                             '${body.getUiJson()}','${body.getTabName()}','${body.getUsername()}', '${body.getCreatedTime()}')`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'Filter inserted successfully.', id: result.data.recordset[0].id });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration', id: 0 });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ status: false, responseCode: 406, data: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-createDataUserFilter ' + error));
                    }
                });
            });
        });
    }
    function createDataUserNotification(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `INSERT INTO m_notification (module_id, username, datetime, title, message, title_glob, message_glob, status, created_user, created_time)
                    OUTPUT inserted.id
                    VALUES ('${body.getModuleId()}', '${body.getUsername()}', '${body.getDatetime()}', '${body.getTitle()}', '${body.getMessage()}', '${body.getTitleGlob()}', '${body.getMessageGlob()}', ${body.getStatus()}, '${body.getUsernameToken()}', '${body.getCreatedTime()}')`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'Notification inserted successfully.', id: result.data.recordset[0].id });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration', id: 0 });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ status: false, responseCode: 406, data: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-updateDataUserNotification ' + error));
                    }
                });
            });
        });
    }
    function updateDataUserNotification(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let insert = body.id;
                        let sql = `UPDATE m_notification SET status = 1 where id = '${insert}'`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: insert + ' updated' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ status: false, responseCode: 406, data: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-updateDataUserNotification ' + error));
                    }
                });
            });
        });
    }
    function updateDataUserProfileRole(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `UPDATE m_user_selection SET 
                      value = '${body.getRoleId()}',
                      updated_user = '${body.getUsername()}', 
                      updated_time = '${body.getUpdatedTime()}' 
                      WHERE module_id = '${body.getModuleId()}' AND username = '${body.getUsername()}' 
                        AND cat_value = 'Role' AND key_value = 'Role'`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'Role selection updated successfully.' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-updateDataUserProfileRole ' + error));
                    }
                });
            });
        });
    }
    function updateDataUserProfilePeriod(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `UPDATE m_user_selection SET 
                      value = '${body.getPeriodId()}',
                      updated_user = '${body.getUsername()}', 
                      updated_time = '${body.getUpdatedTime()}' 
                      WHERE module_id = '${body.getModuleId()}' AND username = '${body.getUsername()}' 
                      AND cat_value = 'Period' AND key_value = 'Period'`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'Period selection updated successfully.' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-updateDataUserProfilePeriod ' + error));
                    }
                });
            });
        });
    }
    function updateDataUserProfileBranchBankwide(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `UPDATE m_user_selection SET 
                      value = '${body.getBankwide()}',
                      updated_user = '${body.getUsername()}', 
                      updated_time = '${body.getUpdatedTime()}' 
                      WHERE module_id = '${body.getModuleId()}' AND username = '${body.getUsername()}' 
                      AND cat_value = 'Branch' AND key_value = 'Bankwide'`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'Branch bankwide selection updated successfully.' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-updateDataUserProfileBranchBankwide' + error));
                    }
                });
            });
        });
    }
    function updateDataUserProfileBranchCode(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `UPDATE m_user_selection SET 
                      value = '${body.getBranchId()}',
                      updated_user = '${body.getUsername()}', 
                      updated_time = '${body.getUpdatedTime()}' 
                      WHERE module_id = '${body.getModuleId()}' AND username = '${body.getUsername()}' 
                        AND cat_value = 'Branch' AND key_value = 'Branch'`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'Branch code selection updated successfully.' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-updateDataUserProfileBranchCode ' + error));
                    }
                });
            });
        });
    }
    function updateDataUserProfileDate(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `UPDATE m_user_selection SET 
                      value = '${body.getDateValue()}',
                      updated_user = '${body.getUsername()}', 
                      updated_time = '${body.getUpdatedTime()}' 
                      WHERE module_id = '${body.getModuleId()}' AND username = '${body.getUsername()}' 
                          AND cat_value = 'Date' AND key_value = '${body.getDateType()}'`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'Date selection updated successfully.' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-updateDataUserProfileDate ' + error));
                    }
                });
            });
        });
    }
    function updateDataUserProfileData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        console.log('dd', body);
                        let sql;
                        if (body.info == 'just image') {
                            sql = `UPDATE m_user_profile SET 
                    img = '${body.getImg()}',
                    updated_user = '${body.getUsernameToken()}',
                    updated_time = '${body.getUpdatedTime()}' 
                    WHERE username = '${body.getUsername()}'`;
                        }
                        else if (body.info == 'image and nickname') {
                            sql = `UPDATE m_user_profile SET 
                    nickname = '${body.getNickname()}',
                    img = '${body.getImg()}',
                    updated_user = '${body.getUsernameToken()}',
                    updated_time = '${body.getUpdatedTime()}' 
                    WHERE username = '${body.getUsername()}'`;
                        }
                        else {
                            sql = `UPDATE m_user_profile SET 
                    nickname = '${body.getNickname()}',
                    updated_user = '${body.getUsernameToken()}',
                    updated_time = '${body.getUpdatedTime()}' 
                    WHERE username = '${body.getUsername()}'`;
                        }
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'User data updated successfully.', img: body.getImg() });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ status: false, responseCode: 406, data: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-updateDataUserProfileData ' + error));
                    }
                });
            });
        });
    }
    function updateDataUserProfileSetting(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        console.log('db', body);
                        let sql = `UPDATE m_user_setting SET 
                      lang = '${body.getLanguage()}', 
                      theme = '${body.getTheme()}', 
                      updated_time = '${body.getUpdatedTime()}'
                      WHERE module_id = '${body.getModuleId()}' AND username = '${body.getUsername()}'`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200 });
                            }
                            else {
                                resolve({ status: false, responseCode: 400 });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ status: false, responseCode: 406, data: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-updateDataUserProfileSetting ' + error));
                    }
                });
            });
        });
    }
    function updateDataUserProfileSettingRpp(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `UPDATE m_user_setting_rpp SET
                       row_amount = '${body.getValuePage()}', 
                       selected = '${body.getSelectedRpp()}', 
                       updated_time = '${body.getUpdatedTime()}' 
                       WHERE username = '${body.getUsername()}' AND seq_no = '${body.getOrder()}'`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200 });
                            }
                            else {
                                resolve({ status: false, responseCode: 400 });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ status: false, responseCode: 406, data: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-updateDataUserProfileSetting ' + error));
                    }
                });
            });
        });
    }
    function updateDataUserProfileMenu(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let checkExist = yield checkDataUserProfileMenu(body);
                        let sql;
                        if (checkExist == 'true') {
                            sql = `UPDATE m_user_menu SET 
                    selected = '${body.getSelectedMenu()}', 
                    updated_user = '${body.getUsername()}',
                    updated_time = '${body.getUpdatedTime()}' 
                    WHERE module_id = '${body.getModuleId()}' AND username = '${body.getUsername()}' 
                      AND menu_id = '${body.getMenuId()}'`;
                        }
                        else {
                            sql = `INSERT INTO m_user_menu (module_id, username, menu_id, selected, created_user, created_time) 
                  VALUES ('${body.getModuleId()}', 
                  '${body.getUsername()}', 
                  '${body.getMenuId()}', 
                  '${body.getSelectedMenu()}',
                  '${body.getUsername()}', 
                  '${body.getCreatedTime()}')`;
                        }
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'Menu fav updated successfully.' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ status: false, responseCode: 406, data: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-updateDataUserProfileMenu ' + error));
                    }
                });
            });
        });
    }
    function updateDataUserFilter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `UPDATE m_user_filter SET 
                        filter_name = '${body.getFilterName()}', 
                        filter_sql = '${body.getFilterSql()}',
                        filter_json = '${body.getFilterJson()}', 
                        ui_json = '${body.getUiJson()}',
                        tab_name = '${body.getTabName()}',
                        updated_user = '${body.getUsername()}',
                        updated_time = '${body.getUpdatedTime()}' 
                        WHERE id = ${body.getId()}`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'Filter updated successfully.' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ status: false, responseCode: 406, data: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-updateDataUserFilter ' + error));
                    }
                });
            });
        });
    }
    function checkDataUserProfileMenu(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `SELECT * FROM m_user_menu WHERE module_id = '${body.getModuleId()}' AND username = '${body.getUsername()}' 
                    AND menu_id = '${body.getMenuId()}'`;
                        let result = yield Query(sql);
                        if (result.rowsAffected > 0) {
                            resolve('true');
                        }
                        else {
                            resolve('false');
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-checkDataUserProfileMenu ' + error));
                    }
                });
            });
        });
    }
    function deleteDataUserNotification(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let where;
                        let message;
                        if (body.total) {
                            where = `WHERE exists (SELECT 1 FROM (SELECT TOP ${body.total} id FROM
                      m_notification WHERE module_id = '${body.moduleId}' AND username = '${body.username}' ORDER BY id ASC) t 
                      WHERE t.id = m_notification.id)`;
                            message = `${body.total} data deleted`;
                        }
                        else {
                            where = `WHERE id = '${body.id}'`;
                            message = '1 data deleted';
                        }
                        let sql = `DELETE FROM m_notification ${where}`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: message });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-deleteDataUserNotification ' + error));
                    }
                });
            });
        });
    }
    function deleteDataUserFilter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `DELETE FROM m_user_filter WHERE id = '${body.id}'`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'Filter deleted successfully.' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-deleteDataUserFilter ' + error));
                    }
                });
            });
        });
    }
}
exports.default = makeUserDb;
