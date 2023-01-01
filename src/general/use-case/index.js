"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternalDataUser = exports.validasiDataInternalMenu = exports.getDataInternalMenu = exports.updateDataInternalMenu = exports.deleteDataInternalMenu = exports.createDataInternalMenu = exports.inputDataInternalUserProfile = exports.getDataInternalUserProfile = exports.deleteDataUserFilter = exports.deleteDataUserNotification = exports.updateDataUserFilter = exports.updateDataUserMenu = exports.updateDataUserSetting = exports.updateDataUserProfileData = exports.updateDataUserDate = exports.updateDataUserBranchCode = exports.updateDataUserBranchBankwide = exports.updateDataUserPeriod = exports.updateDataUserRole = exports.updateDataUserNotification = exports.createDataUserNotification = exports.createDataUserFilter = exports.getDataUserFilter = exports.getDataUserProfileAll = exports.getDataUserNotification = exports.getDataUserModule = exports.getDataSystemParam = exports.deleteDataNewsAdminFooterDetail = exports.updateDataNewsAdminFooterDetail = exports.createDataNewsAdminFooterDetail = exports.getDataNewsAdminFooterDetail = exports.getDataNewsAdminFooter = exports.getDataNewsFooter = exports.deleteDataNewsAdminLoginDetail = exports.updateDataNewsAdminLoginDetail = exports.createDataNewsAdminLoginDetail = exports.getDataNewsAdminLoginDetail = exports.getDataNewsAdminLogin = exports.getDataNewsLogin = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.locale('id');
const data_access_1 = require("../data-access");
const user_1 = __importDefault(require("../entity/user"));
const user_filter_1 = __importDefault(require("../entity/user-filter"));
const news_1 = __importDefault(require("../entity/news"));
const menu_1 = __importDefault(require("../entity/menu"));
const notification_1 = __importDefault(require("../entity/notification"));
const get_news_login_1 = __importDefault(require("./news/login/get-news-login"));
const get_news_admin_login_1 = __importDefault(require("./news/login/get-news-admin-login"));
const get_news_admin_login_detail_1 = __importDefault(require("./news/login/get-news-admin-login-detail"));
const create_news_admin_login_detail_1 = __importDefault(require("./news/login/create-news-admin-login-detail"));
const update_news_admin_login_detail_1 = __importDefault(require("./news/login/update-news-admin-login-detail"));
const delete_news_admin_login_detail_1 = __importDefault(require("./news/login/delete-news-admin-login-detail"));
const get_news_footer_1 = __importDefault(require("./news/footer/get-news-footer"));
const get_news_admin_footer_1 = __importDefault(require("./news/footer/get-news-admin-footer"));
const get_news_admin_footer_detail_1 = __importDefault(require("./news/footer/get-news-admin-footer-detail"));
const create_news_admin_footer_detail_1 = __importDefault(require("./news/footer/create-news-admin-footer-detail"));
const update_news_admin_footer_detail_1 = __importDefault(require("./news/footer/update-news-admin-footer-detail"));
const delete_news_admin_footer_detail_1 = __importDefault(require("./news/footer/delete-news-admin-footer-detail"));
const get_system_param_1 = __importDefault(require("./system/get-system-param"));
const get_user_module_1 = __importDefault(require("./user/get-user-module"));
const get_user_notification_1 = __importDefault(require("./user/notification/get-user-notification"));
const get_user_profile_all_1 = __importDefault(require("./user/get-user-profile-all"));
const get_user_filter_1 = __importDefault(require("./user/get-user-filter"));
const create_user_filter_1 = __importDefault(require("./user/create-user-filter"));
const create_user_notification_1 = __importDefault(require("./user/notification/create-user-notification"));
const update_user_notification_1 = __importDefault(require("./user/notification/update-user-notification"));
const update_user_profile_role_1 = __importDefault(require("./user/update-user-profile-role"));
const update_user_profile_period_1 = __importDefault(require("./user/update-user-profile-period"));
const update_user_profile_branch_bankwide_1 = __importDefault(require("./user/update-user-profile-branch-bankwide"));
const update_user_profile_branch_code_1 = __importDefault(require("./user/update-user-profile-branch-code"));
const update_user_profile_date_1 = __importDefault(require("./user/update-user-profile-date"));
const update_user_profile_data_1 = __importDefault(require("./user/update-user-profile-data"));
const update_user_profile_setting_1 = __importDefault(require("./user/update-user-profile-setting"));
const update_user_profile_menu_1 = __importDefault(require("./user/update-user-profile-menu"));
const update_user_filter_1 = __importDefault(require("./user/update-user-filter"));
const delete_user_notification_1 = __importDefault(require("./user/notification/delete-user-notification"));
const delete_user_filter_1 = __importDefault(require("./user/delete-user-filter"));
const get_internal_user_profile_1 = __importDefault(require("./internal/get-internal-user-profile"));
const input_internal_user_profile_1 = __importDefault(require("./internal/input-internal-user-profile"));
const create_internal_menu_1 = __importDefault(require("./internal/create-internal-menu"));
const delete_internal_menu_1 = __importDefault(require("./internal/delete-internal-menu"));
const update_internal_menu_1 = __importDefault(require("./internal/update-internal-menu"));
const get_internal_menu_1 = __importDefault(require("./internal/get-internal-menu"));
const validasi_internal_menu_1 = __importDefault(require("./internal/validasi-internal-menu"));
const get_internal_data_user_profile_1 = __importDefault(require("./internal/get-internal-data-user-profile"));
const getDataNewsLogin = (0, get_news_login_1.default)({ newsDb: data_access_1.newsDb });
exports.getDataNewsLogin = getDataNewsLogin;
const getDataNewsAdminLogin = (0, get_news_admin_login_1.default)({ newsDb: data_access_1.newsDb, moment: moment_timezone_1.default });
exports.getDataNewsAdminLogin = getDataNewsAdminLogin;
const getDataNewsAdminLoginDetail = (0, get_news_admin_login_detail_1.default)({ newsDb: data_access_1.newsDb, moment: moment_timezone_1.default });
exports.getDataNewsAdminLoginDetail = getDataNewsAdminLoginDetail;
const createDataNewsAdminLoginDetail = (0, create_news_admin_login_detail_1.default)({ newsDb: data_access_1.newsDb, makeNews: news_1.default, moment: moment_timezone_1.default });
exports.createDataNewsAdminLoginDetail = createDataNewsAdminLoginDetail;
const updateDataNewsAdminLoginDetail = (0, update_news_admin_login_detail_1.default)({ newsDb: data_access_1.newsDb, makeNews: news_1.default, moment: moment_timezone_1.default });
exports.updateDataNewsAdminLoginDetail = updateDataNewsAdminLoginDetail;
const deleteDataNewsAdminLoginDetail = (0, delete_news_admin_login_detail_1.default)({ newsDb: data_access_1.newsDb });
exports.deleteDataNewsAdminLoginDetail = deleteDataNewsAdminLoginDetail;
const getDataNewsFooter = (0, get_news_footer_1.default)({ newsDb: data_access_1.newsDb, moment: moment_timezone_1.default });
exports.getDataNewsFooter = getDataNewsFooter;
const getDataNewsAdminFooter = (0, get_news_admin_footer_1.default)({ newsDb: data_access_1.newsDb, moment: moment_timezone_1.default });
exports.getDataNewsAdminFooter = getDataNewsAdminFooter;
const getDataNewsAdminFooterDetail = (0, get_news_admin_footer_detail_1.default)({ newsDb: data_access_1.newsDb, moment: moment_timezone_1.default });
exports.getDataNewsAdminFooterDetail = getDataNewsAdminFooterDetail;
const createDataNewsAdminFooterDetail = (0, create_news_admin_footer_detail_1.default)({ newsDb: data_access_1.newsDb, makeNews: news_1.default });
exports.createDataNewsAdminFooterDetail = createDataNewsAdminFooterDetail;
const updateDataNewsAdminFooterDetail = (0, update_news_admin_footer_detail_1.default)({ newsDb: data_access_1.newsDb, makeNews: news_1.default });
exports.updateDataNewsAdminFooterDetail = updateDataNewsAdminFooterDetail;
const deleteDataNewsAdminFooterDetail = (0, delete_news_admin_footer_detail_1.default)({ newsDb: data_access_1.newsDb });
exports.deleteDataNewsAdminFooterDetail = deleteDataNewsAdminFooterDetail;
const getDataSystemParam = (0, get_system_param_1.default)({ systemDb: data_access_1.systemDb, moment: moment_timezone_1.default });
exports.getDataSystemParam = getDataSystemParam;
const getDataUserModule = (0, get_user_module_1.default)({ userDb: data_access_1.userDb });
exports.getDataUserModule = getDataUserModule;
const getDataUserNotification = (0, get_user_notification_1.default)({ userDb: data_access_1.userDb, moment: moment_timezone_1.default });
exports.getDataUserNotification = getDataUserNotification;
const getDataUserProfileAll = (0, get_user_profile_all_1.default)({ userDb: data_access_1.userDb });
exports.getDataUserProfileAll = getDataUserProfileAll;
const getDataUserFilter = (0, get_user_filter_1.default)({ userDb: data_access_1.userDb });
exports.getDataUserFilter = getDataUserFilter;
const createDataUserFilter = (0, create_user_filter_1.default)({ userDb: data_access_1.userDb, makeUserFilter: user_filter_1.default });
exports.createDataUserFilter = createDataUserFilter;
const createDataUserNotification = (0, create_user_notification_1.default)({ userDb: data_access_1.userDb, makeNotification: notification_1.default });
exports.createDataUserNotification = createDataUserNotification;
const updateDataUserNotification = (0, update_user_notification_1.default)({ userDb: data_access_1.userDb });
exports.updateDataUserNotification = updateDataUserNotification;
const updateDataUserRole = (0, update_user_profile_role_1.default)({ userDb: data_access_1.userDb, makeUser: user_1.default });
exports.updateDataUserRole = updateDataUserRole;
const updateDataUserPeriod = (0, update_user_profile_period_1.default)({ userDb: data_access_1.userDb, makeUser: user_1.default });
exports.updateDataUserPeriod = updateDataUserPeriod;
const updateDataUserBranchBankwide = (0, update_user_profile_branch_bankwide_1.default)({ userDb: data_access_1.userDb, makeUser: user_1.default });
exports.updateDataUserBranchBankwide = updateDataUserBranchBankwide;
const updateDataUserBranchCode = (0, update_user_profile_branch_code_1.default)({ userDb: data_access_1.userDb, makeUser: user_1.default });
exports.updateDataUserBranchCode = updateDataUserBranchCode;
const updateDataUserDate = (0, update_user_profile_date_1.default)({ userDb: data_access_1.userDb, makeUser: user_1.default });
exports.updateDataUserDate = updateDataUserDate;
const updateDataUserProfileData = (0, update_user_profile_data_1.default)({ userDb: data_access_1.userDb, makeUser: user_1.default });
exports.updateDataUserProfileData = updateDataUserProfileData;
const updateDataUserSetting = (0, update_user_profile_setting_1.default)({ userDb: data_access_1.userDb, makeUser: user_1.default });
exports.updateDataUserSetting = updateDataUserSetting;
const updateDataUserMenu = (0, update_user_profile_menu_1.default)({ userDb: data_access_1.userDb, makeUser: user_1.default });
exports.updateDataUserMenu = updateDataUserMenu;
const updateDataUserFilter = (0, update_user_filter_1.default)({ userDb: data_access_1.userDb, makeUserFilter: user_filter_1.default });
exports.updateDataUserFilter = updateDataUserFilter;
const deleteDataUserNotification = (0, delete_user_notification_1.default)({ userDb: data_access_1.userDb });
exports.deleteDataUserNotification = deleteDataUserNotification;
const deleteDataUserFilter = (0, delete_user_filter_1.default)({ userDb: data_access_1.userDb });
exports.deleteDataUserFilter = deleteDataUserFilter;
const getDataInternalUserProfile = (0, get_internal_user_profile_1.default)({ internalDb: data_access_1.internalDb });
exports.getDataInternalUserProfile = getDataInternalUserProfile;
const inputDataInternalUserProfile = (0, input_internal_user_profile_1.default)({ internalDb: data_access_1.internalDb, moment: moment_timezone_1.default });
exports.inputDataInternalUserProfile = inputDataInternalUserProfile;
const createDataInternalMenu = (0, create_internal_menu_1.default)({ internalDb: data_access_1.internalDb, makeMenu: menu_1.default });
exports.createDataInternalMenu = createDataInternalMenu;
const deleteDataInternalMenu = (0, delete_internal_menu_1.default)({ internalDb: data_access_1.internalDb });
exports.deleteDataInternalMenu = deleteDataInternalMenu;
const updateDataInternalMenu = (0, update_internal_menu_1.default)({ internalDb: data_access_1.internalDb, makeMenu: menu_1.default });
exports.updateDataInternalMenu = updateDataInternalMenu;
const getDataInternalMenu = (0, get_internal_menu_1.default)({ internalDb: data_access_1.internalDb, moment: moment_timezone_1.default });
exports.getDataInternalMenu = getDataInternalMenu;
const validasiDataInternalMenu = (0, validasi_internal_menu_1.default)({ internalDb: data_access_1.internalDb, makeMenu: menu_1.default });
exports.validasiDataInternalMenu = validasiDataInternalMenu;
const getInternalDataUser = (0, get_internal_data_user_profile_1.default)({ internalDb: data_access_1.internalDb });
exports.getInternalDataUser = getInternalDataUser;
const generalService = Object.freeze({
    getDataNewsLogin,
    getDataNewsAdminLogin,
    getDataNewsAdminLoginDetail,
    createDataNewsAdminLoginDetail,
    updateDataNewsAdminLoginDetail,
    deleteDataNewsAdminLoginDetail,
    getDataNewsFooter,
    getDataNewsAdminFooter,
    getDataNewsAdminFooterDetail,
    createDataNewsAdminFooterDetail,
    updateDataNewsAdminFooterDetail,
    deleteDataNewsAdminFooterDetail,
    getDataSystemParam,
    getDataUserModule,
    getDataUserNotification,
    getDataUserProfileAll,
    getDataUserFilter,
    createDataUserFilter,
    createDataUserNotification,
    updateDataUserNotification,
    updateDataUserRole,
    updateDataUserPeriod,
    updateDataUserBranchBankwide,
    updateDataUserBranchCode,
    updateDataUserDate,
    updateDataUserProfileData,
    updateDataUserSetting,
    updateDataUserMenu,
    updateDataUserFilter,
    deleteDataUserNotification,
    deleteDataUserFilter,
    getDataInternalUserProfile,
    inputDataInternalUserProfile,
    createDataInternalMenu,
    deleteDataInternalMenu,
    updateDataInternalMenu,
    getDataInternalMenu,
    validasiDataInternalMenu,
    getInternalDataUser
});
exports.default = generalService;
