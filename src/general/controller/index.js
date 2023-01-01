"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternalDataUserProfile = exports.validasiInternalMenu = exports.getInternalMenu = exports.updateInternalMenu = exports.deleteInternalMenu = exports.createInternalMenu = exports.inputInternalUserProfile = exports.getInternalUserProfile = exports.getImage = exports.deleteUserFilter = exports.deleteUserNotification = exports.updateUserFilter = exports.updateUserProfile = exports.updateUserNotification = exports.createUserNotification = exports.createUserFilter = exports.getUserFilter = exports.downloadImageProfile = exports.getUserProfileAll = exports.getUserNotification = exports.getUserModule = exports.getSystemParam = exports.deleteNewsAdminFooterDetail = exports.updateNewsAdminFooterDetail = exports.createNewsAdminFooterDetail = exports.getNewsAdminFooterDetail = exports.getNewsAdminFooter = exports.getNewsFooter = exports.deleteNewsAdminLoginDetail = exports.updateNewsAdminLoginDetail = exports.createNewsAdminLoginDetail = exports.getNewsAdminLoginDetail = exports.getNewsAdminLogin = exports.getNewsLogin = void 0;
const helpers_1 = require("../helpers");
const use_case_1 = require("../use-case");
const middleware_1 = require("../middleware");
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
const get_user_notification_1 = __importDefault(require("./user/get-user-notification"));
const get_user_profile_all_1 = __importDefault(require("./user/get-user-profile-all"));
const image_profile_1 = __importDefault(require("./user/image-profile"));
const get_user_filter_1 = __importDefault(require("./user/get-user-filter"));
const create_user_filter_1 = __importDefault(require("./user/create-user-filter"));
const create_user_notification_1 = __importDefault(require("./user/notification/create-user-notification"));
const update_user_notification_1 = __importDefault(require("./user/update-user-notification"));
const update_user_profile_1 = __importDefault(require("./user/update-user-profile"));
const update_user_filter_1 = __importDefault(require("./user/update-user-filter"));
const delete_user_notification_1 = __importDefault(require("./user/delete-user-notification"));
const delete_user_filter_1 = __importDefault(require("./user/delete-user-filter"));
const get_image_1 = __importDefault(require("./user/get-image"));
const get_internal_user_profile_1 = __importDefault(require("./internal/get-internal-user-profile"));
const input_internal_user_profile_1 = __importDefault(require("./internal/input-internal-user-profile"));
const create_internal_menu_1 = __importDefault(require("./internal/create-internal-menu"));
const delete_internal_menu_1 = __importDefault(require("./internal/delete-internal-menu"));
const update_internal_menu_1 = __importDefault(require("./internal/update-internal-menu"));
const get_internal_menu_1 = __importDefault(require("./internal/get-internal-menu"));
const validasi_internal_menu_1 = __importDefault(require("./internal/validasi-internal-menu"));
const get_internal_data_user_profile_1 = __importDefault(require("./internal/get-internal-data-user-profile"));
const getNewsLogin = (0, get_news_login_1.default)({ getDataNewsLogin: use_case_1.getDataNewsLogin });
exports.getNewsLogin = getNewsLogin;
const getNewsAdminLogin = (0, get_news_admin_login_1.default)({ getDataNewsAdminLogin: use_case_1.getDataNewsAdminLogin, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.getNewsAdminLogin = getNewsAdminLogin;
const getNewsAdminLoginDetail = (0, get_news_admin_login_detail_1.default)({ getDataNewsAdminLoginDetail: use_case_1.getDataNewsAdminLoginDetail, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.getNewsAdminLoginDetail = getNewsAdminLoginDetail;
const createNewsAdminLoginDetail = (0, create_news_admin_login_detail_1.default)({ createDataNewsAdminLoginDetail: use_case_1.createDataNewsAdminLoginDetail, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.createNewsAdminLoginDetail = createNewsAdminLoginDetail;
const updateNewsAdminLoginDetail = (0, update_news_admin_login_detail_1.default)({ updateDataNewsAdminLoginDetail: use_case_1.updateDataNewsAdminLoginDetail, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.updateNewsAdminLoginDetail = updateNewsAdminLoginDetail;
const deleteNewsAdminLoginDetail = (0, delete_news_admin_login_detail_1.default)({ deleteDataNewsAdminLoginDetail: use_case_1.deleteDataNewsAdminLoginDetail, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.deleteNewsAdminLoginDetail = deleteNewsAdminLoginDetail;
const getNewsFooter = (0, get_news_footer_1.default)({ getDataNewsFooter: use_case_1.getDataNewsFooter });
exports.getNewsFooter = getNewsFooter;
const getNewsAdminFooter = (0, get_news_admin_footer_1.default)({ getDataNewsAdminFooter: use_case_1.getDataNewsAdminFooter, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.getNewsAdminFooter = getNewsAdminFooter;
const getNewsAdminFooterDetail = (0, get_news_admin_footer_detail_1.default)({ getDataNewsAdminFooterDetail: use_case_1.getDataNewsAdminFooterDetail, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.getNewsAdminFooterDetail = getNewsAdminFooterDetail;
const createNewsAdminFooterDetail = (0, create_news_admin_footer_detail_1.default)({ createDataNewsAdminFooterDetail: use_case_1.createDataNewsAdminFooterDetail, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.createNewsAdminFooterDetail = createNewsAdminFooterDetail;
const updateNewsAdminFooterDetail = (0, update_news_admin_footer_detail_1.default)({ updateDataNewsAdminFooterDetail: use_case_1.updateDataNewsAdminFooterDetail, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.updateNewsAdminFooterDetail = updateNewsAdminFooterDetail;
const deleteNewsAdminFooterDetail = (0, delete_news_admin_footer_detail_1.default)({ deleteDataNewsAdminFooterDetail: use_case_1.deleteDataNewsAdminFooterDetail, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.deleteNewsAdminFooterDetail = deleteNewsAdminFooterDetail;
const getSystemParam = (0, get_system_param_1.default)({ getDataSystemParam: use_case_1.getDataSystemParam });
exports.getSystemParam = getSystemParam;
const getUserModule = (0, get_user_module_1.default)({ getDataUserModule: use_case_1.getDataUserModule, internalServer: middleware_1.internalServer });
exports.getUserModule = getUserModule;
const getUserNotification = (0, get_user_notification_1.default)({ getDataUserNotification: use_case_1.getDataUserNotification, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.getUserNotification = getUserNotification;
const getUserProfileAll = (0, get_user_profile_all_1.default)({ getDataUserProfileAll: use_case_1.getDataUserProfileAll, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.getUserProfileAll = getUserProfileAll;
const downloadImageProfile = (0, image_profile_1.default)({});
exports.downloadImageProfile = downloadImageProfile;
const getUserFilter = (0, get_user_filter_1.default)({ getDataUserFilter: use_case_1.getDataUserFilter, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.getUserFilter = getUserFilter;
const createUserFilter = (0, create_user_filter_1.default)({ createDataUserFilter: use_case_1.createDataUserFilter, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.createUserFilter = createUserFilter;
const createUserNotification = (0, create_user_notification_1.default)({ createDataUserNotification: use_case_1.createDataUserNotification, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.createUserNotification = createUserNotification;
const updateUserNotification = (0, update_user_notification_1.default)({ updateDataUserNotification: use_case_1.updateDataUserNotification, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.updateUserNotification = updateUserNotification;
const updateUserProfile = (0, update_user_profile_1.default)({ updateDataUserRole: use_case_1.updateDataUserRole, updateDataUserPeriod: use_case_1.updateDataUserPeriod, updateDataUserBranchBankwide: use_case_1.updateDataUserBranchBankwide, updateDataUserBranchCode: use_case_1.updateDataUserBranchCode, updateDataUserDate: use_case_1.updateDataUserDate, updateDataUserProfileData: use_case_1.updateDataUserProfileData, updateDataUserSetting: use_case_1.updateDataUserSetting, updateDataUserMenu: use_case_1.updateDataUserMenu, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.updateUserProfile = updateUserProfile;
const updateUserFilter = (0, update_user_filter_1.default)({ updateDataUserFilter: use_case_1.updateDataUserFilter, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.updateUserFilter = updateUserFilter;
const deleteUserNotification = (0, delete_user_notification_1.default)({ deleteDataUserNotification: use_case_1.deleteDataUserNotification, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.deleteUserNotification = deleteUserNotification;
const deleteUserFilter = (0, delete_user_filter_1.default)({ deleteDataUserFilter: use_case_1.deleteDataUserFilter, internalServer: middleware_1.internalServer, redisClient: helpers_1.redisClient });
exports.deleteUserFilter = deleteUserFilter;
const getImage = (0, get_image_1.default)({ internalServer: middleware_1.internalServer });
exports.getImage = getImage;
const getInternalUserProfile = (0, get_internal_user_profile_1.default)({ getDataInternalUserProfile: use_case_1.getDataInternalUserProfile });
exports.getInternalUserProfile = getInternalUserProfile;
const inputInternalUserProfile = (0, input_internal_user_profile_1.default)({ inputDataInternalUserProfile: use_case_1.inputDataInternalUserProfile });
exports.inputInternalUserProfile = inputInternalUserProfile;
const createInternalMenu = (0, create_internal_menu_1.default)({ createDataInternalMenu: use_case_1.createDataInternalMenu });
exports.createInternalMenu = createInternalMenu;
const deleteInternalMenu = (0, delete_internal_menu_1.default)({ deleteDataInternalMenu: use_case_1.deleteDataInternalMenu });
exports.deleteInternalMenu = deleteInternalMenu;
const updateInternalMenu = (0, update_internal_menu_1.default)({ updateDataInternalMenu: use_case_1.updateDataInternalMenu });
exports.updateInternalMenu = updateInternalMenu;
const getInternalMenu = (0, get_internal_menu_1.default)({ getDataInternalMenu: use_case_1.getDataInternalMenu });
exports.getInternalMenu = getInternalMenu;
const validasiInternalMenu = (0, validasi_internal_menu_1.default)({ validasiDataInternalMenu: use_case_1.validasiDataInternalMenu });
exports.validasiInternalMenu = validasiInternalMenu;
const getInternalDataUserProfile = (0, get_internal_data_user_profile_1.default)({ getInternalDataUser: use_case_1.getInternalDataUser });
exports.getInternalDataUserProfile = getInternalDataUserProfile;
const generalController = Object.freeze({
    getNewsLogin,
    getNewsAdminLogin,
    getNewsAdminLoginDetail,
    createNewsAdminLoginDetail,
    updateNewsAdminLoginDetail,
    deleteNewsAdminLoginDetail,
    getNewsFooter,
    getNewsAdminFooter,
    getNewsAdminFooterDetail,
    createNewsAdminFooterDetail,
    updateNewsAdminFooterDetail,
    deleteNewsAdminFooterDetail,
    getSystemParam,
    getUserModule,
    getUserNotification,
    getUserProfileAll,
    downloadImageProfile,
    getUserFilter,
    createUserFilter,
    createUserNotification,
    updateUserNotification,
    updateUserProfile,
    updateUserFilter,
    deleteUserNotification,
    deleteDataUserFilter: use_case_1.deleteDataUserFilter,
    getImage,
    getInternalUserProfile,
    inputInternalUserProfile,
    createInternalMenu,
    deleteInternalMenu,
    updateInternalMenu,
    getInternalMenu,
    validasiInternalMenu,
    getInternalDataUserProfile
});
exports.default = generalController;
