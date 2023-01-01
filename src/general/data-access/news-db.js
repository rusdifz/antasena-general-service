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
function makeNewsDb({ Query, QueryTransaction, QueryGet }) {
    return Object.freeze({
        getDataNewsLogin,
        getDataNewsAdminLogin,
        getDataNewsAdminLoginDetail,
        getDataNewsFooter,
        getDataNewsAdminFooter,
        getDataNewsAdminFooterDetail,
        getIdBeforeLogin,
        createDataNewsAdminLoginDetail,
        createDataNewsAdminFooterDetail,
        updateDataNewsAdminLoginDetail,
        updateDataNewsAdminFooterDetail,
        deleteDataNewsAdminLoginDetail,
        deleteDataNewsAdminFooterDetail,
        validasiNews
    });
    function getDataNewsLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `SELECT id, news_title, img_url, img_name, news_order FROM m_news_main ORDER BY news_order`;
                        let result = yield QueryGet(sql);
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
                        reject(new Error('getDataNewsLogin ' + error));
                    }
                });
            });
        });
    }
    function getDataNewsAdminLogin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // pake paging
                        let limit = '';
                        let pagination = '';
                        let orderby;
                        let where = "WHERE 1=1";
                        if (body.filter) {
                            where += " and " + body.filter;
                        }
                        if (body.perpage) {
                            limit += body.perpage;
                        }
                        else {
                            limit += 1000;
                        }
                        if (body.page) {
                            let offset = parseInt(body.page);
                            let page = offset - 1;
                            pagination = page * limit;
                        }
                        else {
                            pagination = 0;
                        }
                        let orderBy = body.orderby;
                        if (orderBy == 'newsTitle') {
                            orderby = 'ORDER BY news_title ';
                        }
                        else {
                            orderby = 'ORDER BY id ';
                        }
                        if (body.ordertype == 'asc' || body.ordertype == 'desc') {
                            orderby += body.ordertype;
                        }
                        else {
                            orderby += 'asc';
                        }
                        let sql = `SELECT id, news_title, img_url, img_name, news_order, created_user, created_time, updated_user, updated_time
                    FROM m_news_main ${where} ${orderby} OFFSET ${parseInt(pagination)} ROWS FETCH NEXT ${parseInt(limit)} ROWS ONLY`;
                        let count = `SELECT COUNT (id) as 'count' FROM m_news_main ${where}`;
                        let sqlFilter = `SELECT field_order as 'fieldOrder', field_name as 'fieldName', field_desc as 'fieldDesc', field_type as 'fieldType'  
                          FROM M_Menu_Filter WHERE menu_id = '025'`;
                        let result = yield QueryGet(sql);
                        let resCount = yield QueryGet(count);
                        let resFilter = yield Query(sqlFilter);
                        // console.log('dd', resCount.recordset[0]);
                        if (result.status == true && resCount.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, data: result.data.recordset, filter: resFilter.recordset, countAll: resCount.data.recordset[0].count });
                            }
                            else {
                                resolve({ status: true, data: [], filter: resFilter.recordset, countAll: resCount.data.recordset[0].count });
                            }
                        }
                        else {
                            if (result.status == false) {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + resCount.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('getDataNewsAdminLogin ' + error));
                    }
                });
            });
        });
    }
    function getDataNewsAdminLoginDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `SELECT id as news_id, news_title, img_url, img_name, news_order, created_user, created_time, updated_user, updated_time 
                    FROM m_news_main WHERE id = ${body.newsId}`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, field: 'filled', data: result.data.recordset[0] });
                            }
                            else {
                                resolve({ status: true, field: 'empty', data: {} });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('getDataNewsAdminLoginDetail ' + error));
                    }
                });
            });
        });
    }
    function getDataNewsFooter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `SELECT id as 'newsId',  news_datetime as 'newsDatetime', news_text as 'newsText' FROM m_news_footer WHERE module_id = '${body.moduleId}'`;
                        let result = yield QueryGet(sql);
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
                        reject(new Error('getDataNewsFooter ' + error));
                    }
                });
            });
        });
    }
    function getDataNewsAdminFooter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // pake paging
                        let limit = '';
                        let pagination = '';
                        let orderby;
                        let where = "WHERE module_id = '" + body.moduleId + "' ";
                        if (body.filter) {
                            where += " and " + body.filter;
                        }
                        if (body.perpage) {
                            limit += body.perpage;
                        }
                        else {
                            limit += 1000;
                        }
                        if (body.page) {
                            let offset = parseInt(body.page);
                            let page = offset - 1;
                            pagination = page * limit;
                        }
                        else {
                            pagination = 0;
                        }
                        let orderBy = body.orderby;
                        if (orderBy == 'newsTitle') {
                            orderby = 'ORDER BY news_title ';
                        }
                        else {
                            orderby = 'ORDER BY id ';
                        }
                        if (body.ordertype == 'asc' || body.ordertype == 'desc') {
                            orderby += body.ordertype;
                        }
                        else {
                            orderby += 'asc';
                        }
                        let sql = `SELECT id, news_title, news_datetime, news_text, created_user, created_time, updated_user, updated_time FROM m_news_footer ${where}
                    ${orderby} OFFSET ${parseInt(pagination)} ROWS FETCH NEXT ${parseInt(limit)} ROWS ONLY`;
                        let count = `SELECT COUNT (id) as 'count' FROM m_news_footer ${where}`;
                        let sqlFilter = `SELECT field_order as 'fieldOrder', field_name as 'fieldName', field_desc as 'fieldDesc', field_type as 'fieldType'  
                          FROM M_Menu_Filter WHERE menu_id = '026'`;
                        let result = yield QueryGet(sql);
                        let resCount = yield QueryGet(count);
                        let resFilter = yield Query(sqlFilter);
                        if (result.status == true && resCount.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, data: result.data.recordset, filter: resFilter.recordset, countAll: resCount.data.recordset[0].count });
                            }
                            else {
                                resolve({ status: true, data: [], filter: resFilter.recordset, countAll: resCount.data.recordset[0].count });
                            }
                        }
                        else {
                            if (result.status == false) {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + resCount.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('getDataNewsAdminFooter ' + error));
                    }
                });
            });
        });
    }
    function getDataNewsAdminFooterDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `SELECT id, news_title, news_datetime, news_text, created_user, created_time, updated_user, updated_time FROM m_news_footer WHERE id = '${body.newsId}'`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, field: 'filled', data: result.data.recordset[0] });
                            }
                            else {
                                resolve({ status: true, field: 'empty', data: {} });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('getDataNewsAdminFooterDetail ' + error));
                    }
                });
            });
        });
    }
    function getIdBeforeLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `SELECT id FROM m_news_main ORDER BY id desc`;
                        let result = yield Query(sql);
                        if (result.recordset.length > 0) {
                            const number = parseInt(result.recordset[0].id);
                            resolve({ data: number + 1, status: true });
                        }
                        else {
                            resolve({ data: 1, status: false });
                        }
                    }
                    catch (error) {
                        reject(new Error('getIdBeforeLogin ' + error));
                    }
                });
            });
        });
    }
    function createDataNewsAdminLoginDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        console.log('body', body);
                        let sql = `INSERT INTO m_news_main (news_datetime, news_title, news_order, img_url, img_name, created_user, created_time) 
                    OUTPUT inserted.id
                    VALUES ('${body.getNewsDatetime()}', '${body.getNewsTitle()}', ${body.getNewsOrder()},'${body.getImgUrl()}', '${body.getImgName()}', '${body.getUsernameToken()}', '${body.getCreatedTime()}')`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ code: 200, status: true, message: 'Create news main successfully.', id: result.data.recordset[0].id });
                            }
                            else {
                                resolve({ code: 400, status: false, message: 'Wrong Configuration', id: 0, img: '' });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ code: 406, status: false, message: 'SQL ' + result.data.number, id: 0, img: '' });
                            }
                            else {
                                resolve({ code: 500, status: false, message: 'SQL ' + result.data.number, id: 0, img: '' });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('createDataNewsLogin ' + error));
                    }
                });
            });
        });
    }
    function createDataNewsAdminFooterDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `INSERT INTO m_news_footer (module_id, news_title, news_datetime, news_text, created_user, created_time) 
                    OUTPUT inserted.id
                    VALUES ('${body.getModuleId()}', '${body.getNewsTitle()}','${body.getNewsDatetime()}', '${body.getNewsText()}', '${body.getUsernameToken()}', '${body.getCreatedTime()}')`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ code: 200, status: true, message: 'Create news footer successfully.', id: result.data.recordset[0].id });
                            }
                            else {
                                resolve({ code: 400, status: false, message: 'Wrong Configuration', id: 0 });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ code: 406, status: false, message: 'SQL ' + result.data.number, id: 0 });
                            }
                            else {
                                resolve({ code: 500, status: false, message: 'SQL ' + result.data.number, id: 0 });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('createDataNewsAdminFooterDetail ' + error));
                    }
                });
            });
        });
    }
    function updateDataNewsAdminLoginDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        console.log('body', body);
                        let sql;
                        if (body.info == 'img') {
                            sql = `UPDATE m_news_main SET 
                  news_datetime = '${body.getNewsDatetime()}', 
                  news_title = '${body.getNewsTitle()}',
                  news_order = ${body.getNewsOrder()},
                  img_url = '${body.getImgUrl()}', 
                  img_name = '${body.getImgName()}', 
                  updated_user = '${body.getUsernameToken()}', 
                  updated_time = '${body.getUpdatedTime()}' WHERE id = ${body.getNewsId()}`;
                        }
                        else {
                            sql = `UPDATE m_news_main SET 
                  news_datetime = '${body.getNewsDatetime()}', 
                  news_title = '${body.getNewsTitle()}', 
                  news_order = ${body.getNewsOrder()},
                  updated_user = '${body.getUsernameToken()}', 
                  updated_time = '${body.getUpdatedTime()}' WHERE id = ${body.getNewsId()}`;
                        }
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ code: 200, status: true, message: 'Update news main successfully.' });
                            }
                            else {
                                resolve({ code: 400, status: false, message: 'Wrong Configuration' });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ code: 406, status: false, message: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ code: 500, status: false, message: 'SQL ' + result.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('createDataNewsLogin ' + error));
                    }
                });
            });
        });
    }
    function updateDataNewsAdminFooterDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `UPDATE m_news_footer SET 
                    news_title = '${body.getNewsTitle()}', 
                    news_datetime = '${body.getNewsDatetime()}', 
                    news_text = '${body.getNewsText()}', 
                    updated_user = '${body.getUsernameToken()}', 
                    updated_time = '${body.getUpdatedTime()}' 
                    WHERE id = ${body.getNewsId()}`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ code: 200, status: true, message: 'Update news footer successfully.' });
                            }
                            else {
                                resolve({ code: 400, status: false, message: 'Wrong Configuration' });
                            }
                        }
                        else {
                            if (result.data.number == 2526) {
                                resolve({ code: 406, status: false, message: 'SQL ' + result.data.number });
                            }
                            else {
                                resolve({ code: 500, status: false, message: 'SQL ' + result.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('updateDataNewsAdminFooterDetail ' + error));
                    }
                });
            });
        });
    }
    function deleteDataNewsAdminLoginDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const id = body.newsId.toString().replace(/,/gi, "','");
                        const sql = `DELETE FROM m_news_main WHERE id in ('${id}')`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ code: 200, status: true, message: 'Delete news main successfully.' });
                            }
                            else {
                                resolve({ code: 400, status: false, message: 'Wrong Configuration' });
                            }
                        }
                        else {
                            resolve({ code: 500, status: false, message: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('createDataNewsLogin ' + error));
                    }
                });
            });
        });
    }
    function deleteDataNewsAdminFooterDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const id = body.newsId.toString().replace(/,/gi, "','");
                        const sql = `DELETE FROM m_news_footer WHERE id in ('${id}')`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ code: 200, status: true, message: 'Delete news footer successfully.' });
                            }
                            else {
                                resolve({ code: 400, status: false, message: 'Wrong Configuration' });
                            }
                        }
                        else {
                            resolve({ code: 500, status: false, message: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('deleteDataNewsAdminFooterDetail ' + error));
                    }
                });
            });
        });
    }
    function validasiNews(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let datasend;
                        if (body.info == "create") {
                            const sqlId = `SELECT * FROM m_news_main where news_order = '${body.newsOrder}'`;
                            let checkId = yield Query(sqlId);
                            if (checkId.recordset.length > 0) {
                                const sqlErr = "SELECT err_desc_locl as 'local', err_desc_glob as 'global' FROM m_errcode WHERE err_code = 'N001'";
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
                        else {
                            const sqlId = `SELECT * FROM m_news_main where news_order = '${body.newsOrder}' AND id <> ${body.id}`;
                            let checkId = yield Query(sqlId);
                            if (checkId.recordset.length > 0) {
                                const sqlErr = "SELECT err_desc_locl as 'local', err_desc_glob as 'global' FROM m_errcode WHERE err_code = 'N002'";
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
                        resolve(datasend);
                    }
                    catch (error) {
                        reject(new Error('validasiNews ' + error));
                    }
                });
            });
        });
    }
}
exports.default = makeNewsDb;
