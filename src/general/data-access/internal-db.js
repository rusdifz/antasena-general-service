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
function makeInternalDb({ Query, QueryTransaction, QueryGet }) {
    return Object.freeze({
        getDataInternalUserProfile,
        checkDataInternalUserProfile,
        updateDataInternalUserProfile,
        createDataInternalUserProfile,
        getDataInternalMenu,
        createDataInternalMenu,
        updateDataInternalMenu,
        deleteDataInternalMenu,
        validasiMenuCreate,
        validasiMenuUpdate,
        validasiMenuDelete,
        getDataUserProfileData
    });
    //validasi data masih menggunakan function Query
    function getDataInternalUserProfile(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `SELECT value FROM m_user_selection WHERE module_id = '${body.moduleId}' AND username = '${body.username}' 
                    AND cat_value = '${body.cat}' AND key_value = '${body.key}'`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, responseCode: 200, data: result.data.recordset[0] });
                            }
                            else {
                                resolve({ status: true, responseCode: 200, data: { value: null } });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataInternalUserProfile ' + error));
                    }
                });
            });
        });
    }
    function checkDataInternalUserProfile(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `SELECT value FROM m_user_selection WHERE module_id = '${body.moduleId}' AND username = '${body.username}' 
                    AND cat_value = '${body.cat}' AND key_value = '${body.key}'`;
                        let result = yield QueryGet(sql);
                        // console.log('result', result.recordset);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ responseCode: 200, data: true });
                            }
                            else {
                                resolve({ responseCode: 200, data: false });
                            }
                        }
                        else {
                            resolve({ responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-checkDataInternalUserProfile ' + error));
                    }
                });
            });
        });
    }
    function updateDataInternalUserProfile(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const sql = `UPDATE m_user_selection SET value = '${body.value}', updated_user = '${body.username}', updated_time = '${body.time}' 
                        WHERE module_id = '${body.moduleId}' AND username = '${body.username}' AND 
                        cat_value = '${body.cat}' AND key_value = '${body.key}'`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'Data updated successfully.' });
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
                        reject(new Error('updateDataInternalUserProfile ' + error));
                    }
                });
            });
        });
    }
    function createDataInternalUserProfile(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const sql = `INSERT INTO m_user_selection (module_id, username, cat_value, key_value, value, created_user, created_time)
                      VALUES ('${body.moduleId}', '${body.username}', '${body.cat}', '${body.key}', '${body.value}', '${body.username}', '${body.time}')`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'Data updated successfully.' });
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
                        reject(new Error('createDataInternalUserProfile ' + error));
                    }
                });
            });
        });
    }
    function getDataInternalMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `SELECT * FROM m_menu`;
                        let result = yield QueryGet(sql);
                        console.log('res', result);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, data: result.data.recordset });
                            }
                            else {
                                resolve({ status: true, data: [] });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('userDb-getDataInternalMenu ' + error));
                    }
                });
            });
        });
    }
    function createDataInternalMenu(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let menuPeriod;
                        if (body.getMenuPeriod() == 'null' || body.getMenuPeriod() == '' || body.getMenuPeriod() == null) {
                            menuPeriod = null;
                        }
                        else {
                            menuPeriod = `'${body.getMenuPeriod()}'`;
                        }
                        let disabledUser;
                        if (body.getDisabledUser() == 'null' || body.getDisabledUser() == '' || body.getDisabledUser() == null) {
                            disabledUser = null;
                        }
                        else {
                            disabledUser = `'${body.getDisabledUser()}'`;
                        }
                        let disabledTime;
                        if (body.getDisabledTime() == 'null' || body.getDisabledTime() == '' || body.getDisabledTime() == null) {
                            disabledTime = null;
                        }
                        else {
                            disabledTime = `'${body.getDisabledTime()}'`;
                        }
                        const sql = `INSERT INTO m_menu (module_id, menu_id, menu_category, menu_icon, menu_desc, menu_desc_glob, menu_type, menu_parent, menu_url, menu_order, menu_period, disabled_status, 
                                        disabled_user, disabled_time,  created_user, created_time)
                    VALUES ('${body.getModuleId()}', '${body.getMenuId()}', '${body.getMenuCategory()}', '${body.getMenuIcon()}', '${body.getMenuDesc()}', '${body.getMenuDescGlob()}',
                            '${body.getMenuType()}', '${body.getMenuParent()}', '${body.getMenuUrl()}', '${body.getMenuOrder()}', ${menuPeriod}, ${body.getDisabledStatus()}, 
                            ${disabledUser}, ${disabledTime}, '${body.getUsernameToken()}', '${body.getCreatedTime()}') `;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, message: 'Menu Berhasil Dibuat', messageGlob: ' Menu Created Successfully' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, message: 'Menu Gagal Dibuat', messageGlob: 'Menu created failed' });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ status: false, responseCode: 406, message: 'SQL ' + result.data.number, messageGlob: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, message: 'SQL ' + result.data.number, messageGlob: 'SQL ' + result.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('createDataInternalMenu ' + error));
                    }
                });
            });
        });
    }
    function updateDataInternalMenu(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let menuPeriod;
                        if (body.getMenuPeriod() == 'null' || body.getMenuPeriod() == '' || body.getMenuPeriod() == null) {
                            menuPeriod = null;
                        }
                        else {
                            menuPeriod = `'${body.getMenuPeriod()}'`;
                        }
                        let disabledUser;
                        if (body.getDisabledUser() == 'null' || body.getDisabledUser() == '' || body.getDisabledUser() == null) {
                            disabledUser = null;
                        }
                        else {
                            disabledUser = `'${body.getDisabledUser()}'`;
                        }
                        let disabledTime;
                        if (body.getDisabledTime() == 'null' || body.getDisabledTime() == '' || body.getDisabledTime() == null) {
                            disabledTime = null;
                        }
                        else {
                            disabledTime = `'${body.getDisabledTime()}'`;
                        }
                        const sql = `UPDATE m_menu SET menu_desc = '${body.getMenuDesc()}', menu_desc_glob = '${body.getMenuDescGlob()}', menu_type = '${body.getMenuType()}',
                                       menu_parent = '${body.getMenuParent()}', menu_url = '${body.getMenuUrl()}', menu_order = '${body.getMenuOrder()}', 
                                       menu_period = ${menuPeriod}, disabled_status = ${body.getDisabledStatus()}, disabled_user = ${disabledUser}, 
                                       disabled_time = ${disabledTime}, updated_user = '${body.getUsernameToken()}', updated_time = '${body.getUpdatedTime()}'
                                       WHERE module_id = '${body.getModuleId()}' AND menu_id = '${body.getMenuId()}'`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, message: 'Menu Berhasil Diubah', messageGlob: ' Menu Updated Successfully' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, message: 'Menu Gagal Diubah', messageGlob: 'Menu Updated Failed' });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ status: false, responseCode: 406, message: 'SQL ' + result.data.number, messageGlob: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, message: 'SQL ' + result.data.number, messageGlob: 'SQL ' + result.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('updateDataInternalMenu ' + error));
                    }
                });
            });
        });
    }
    function deleteDataInternalMenu(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const id = body.menuId.toString().replace(/,/gi, "','");
                        const sql = `DELETE FROM m_menu WHERE menu_id in ('${id}') AND module_id = '${body.moduleId}'`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            const total = body.menuId.length;
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, message: total + ' Menu Berhasil Dihapus', messageGlob: total + ' Menu deleted Successfully' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, message: total + ' Menu Gagal Dihapus', messageGlob: total + ' Menu deleted Failed' });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, message: 'SQL ' + result.data.number, messageGlob: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('deleteDataInternalMenu' + error));
                    }
                });
            });
        });
    }
    function validasiMenuCreate(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const sqlId = `SELECT * FROM m_menu where menu_id = '${body.getMenuId()}' AND module_id = '${body.getModuleId()}'`;
                        let checkId = yield Query(sqlId);
                        let datasend;
                        if (checkId.recordset.length > 0) {
                            const sqlErr = "SELECT err_desc_locl as 'local', err_desc_glob as 'global' FROM m_errcode WHERE err_code = 'M001'";
                            const lookupErr = yield Query(sqlErr);
                            datasend = {
                                status: false,
                                data: {
                                    locl: lookupErr.recordset[0].local,
                                    glob: lookupErr.recordset[0].global
                                }
                            };
                        }
                        else {
                            const sqlName = `SELECT * FROM m_menu WHERE menu_desc = '${body.getMenuDesc()}' AND module_id = '${body.getModuleId()}'`;
                            let checkName = yield Query(sqlName);
                            if (checkName.recordset.length > 0) {
                                const sqlErr = "SELECT err_desc_locl as 'local', err_desc_glob as 'global' FROM m_errcode WHERE err_code = 'M003'";
                                const lookupErr = yield Query(sqlErr);
                                datasend = {
                                    status: false,
                                    data: {
                                        locl: lookupErr.recordset[0].local,
                                        glob: lookupErr.recordset[0].global
                                    }
                                };
                            }
                            else {
                                const sqlName2 = `SELECT * FROM m_menu WHERE menu_desc_glob = '${body.getMenuDescGlob()}' AND module_id = '${body.getModuleId()}'`;
                                let checkName2 = yield Query(sqlName2);
                                if (checkName2.recordset.length > 0) {
                                    const sqlErr = "SELECT err_desc_locl as 'local', err_desc_glob as 'global' FROM m_errcode WHERE err_code = 'M004'";
                                    const lookupErr = yield Query(sqlErr);
                                    datasend = {
                                        status: false,
                                        data: {
                                            locl: lookupErr.recordset[0].local,
                                            glob: lookupErr.recordset[0].global
                                        }
                                    };
                                }
                                else {
                                    datasend = {
                                        status: true,
                                        data: "OK"
                                    };
                                }
                            }
                        }
                        resolve(datasend);
                    }
                    catch (error) {
                        reject(new Error('validasiMenuCreate ' + error));
                    }
                });
            });
        });
    }
    function validasiMenuUpdate(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const sqlId = `SELECT * FROM m_menu where menu_id = '${body.getMenuId()}' AND id = ${body.getId()}`;
                        let checkId = yield Query(sqlId);
                        let datasend;
                        if (checkId.recordset.length > 0) {
                            const sqlNameLcl = `SELECT * FROM m_menu WHERE menu_desc = '${body.getMenuDesc()}' AND module_id = '${body.getModuleId()}' AND menu_id != '${body.getMenuId()}'`;
                            let checkNameLcl = yield Query(sqlNameLcl);
                            if (checkNameLcl.recordset.length > 0) {
                                const sqlErr = "SELECT err_desc_locl as 'local', err_desc_glob as 'global' FROM m_errcode WHERE err_code = 'M003'";
                                const lookupErr = yield Query(sqlErr);
                                datasend = {
                                    status: false,
                                    data: {
                                        locl: lookupErr.recordset[0].local,
                                        glob: lookupErr.recordset[0].global
                                    }
                                };
                            }
                            else {
                                const sqlNameGlob = `SELECT * FROM m_menu WHERE menu_desc_glob = '${body.getMenuDescGlob()}' AND module_id = '${body.getModuleId()}' AND menu_id <> '${body.getMenuId()}'`;
                                let checkNameGlob = yield Query(sqlNameGlob);
                                if (checkNameGlob.recordset.length > 0) {
                                    const sqlErr = "SELECT err_desc_locl as 'local', err_desc_glob as 'global' FROM m_errcode WHERE err_code = 'M004'";
                                    const lookupErr = yield Query(sqlErr);
                                    datasend = {
                                        status: false,
                                        data: {
                                            locl: lookupErr.recordset[0].local,
                                            glob: lookupErr.recordset[0].global
                                        }
                                    };
                                }
                                else {
                                    datasend = {
                                        status: true,
                                        data: "OK"
                                    };
                                }
                            }
                        }
                        else {
                            const sqlErr = "SELECT err_desc_locl as 'local', err_desc_glob as 'global' FROM m_errcode WHERE err_code = 'M002'";
                            const lookupErr = yield Query(sqlErr);
                            datasend = {
                                status: false,
                                data: {
                                    locl: lookupErr.recordset[0].local,
                                    glob: lookupErr.recordset[0].global
                                }
                            };
                        }
                        resolve(datasend);
                    }
                    catch (error) {
                        reject(new Error('validasiMenuUpdate ' + error));
                    }
                });
            });
        });
    }
    function validasiMenuDelete(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        console.log('m', body);
                        const dataMenuId = body.menuId;
                        let dataError = [];
                        let checkData = yield Promise.all(dataMenuId.map((menuId) => __awaiter(this, void 0, void 0, function* () {
                            const sqlUserMenu = `SELECT * FROM m_user_menu WHERE module_id = '${body.moduleId}' AND menu_id = '${menuId}'`;
                            let checkUseUser = yield Query(sqlUserMenu);
                            if (checkUseUser.recordset.length > 0) {
                                const sqlErr = "SELECT err_desc_locl as 'local', err_desc_glob as 'global' FROM m_errcode WHERE err_code = 'M005'";
                                const lookupErr = yield Query(sqlErr);
                                const errData = {
                                    menuId: menuId,
                                    locl: lookupErr.recordset[0].local,
                                    glob: lookupErr.recordset[0].global
                                };
                                dataError.push(errData);
                            }
                            else {
                                const sqlRoleMenu = `SELECT * FROM m_role_menu WHERE module_id = '${body.moduleId}' AND menu_id = '${menuId}'`;
                                let checkUseRole = yield Query(sqlRoleMenu);
                                if (checkUseRole.recordset.length > 0) {
                                    const sqlErr = "SELECT err_desc_locl as 'local', err_desc_glob as 'global' FROM m_errcode WHERE err_code = 'M006'";
                                    const lookupErr = yield Query(sqlErr);
                                    const errData = {
                                        menuId: menuId,
                                        locl: lookupErr.recordset[0].local,
                                        glob: lookupErr.recordset[0].global
                                    };
                                    dataError.push(errData);
                                }
                                else {
                                    console.log('data ok');
                                }
                            }
                            return menuId;
                        })));
                        let dataSend;
                        if (dataError.length > 0) {
                            dataSend = {
                                status: false,
                                data: dataError
                            };
                        }
                        else {
                            dataSend = {
                                status: true,
                                data: "OK"
                            };
                        }
                        resolve(dataSend);
                    }
                    catch (error) {
                        reject(new Error('validasiMenuDelete ' + error));
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
                        let sql = `SELECT username, nickname, img from m_user_profile where username = '${body.username}'`;
                        let result = yield QueryGet(sql);
                        // console.log('res', result);
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
}
exports.default = makeInternalDb;
