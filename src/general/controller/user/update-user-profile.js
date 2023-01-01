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
function makeUpdateUserProfile({ updateDataUserRole, updateDataUserPeriod, updateDataUserBranchBankwide, updateDataUserBranchCode, updateDataUserDate, updateDataUserProfileData, updateDataUserSetting, updateDataUserMenu, internalServer, redisClient }) {
    return function updateUserProfile(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bodyparam = httpRequest.body;
                const hosturl = httpRequest.hostname;
                const token = { token: httpRequest.token };
                const authMe = yield internalServer.authentication(token);
                let posted;
                let actionDetail;
                if (authMe.status == false) {
                    posted = {
                        status: false,
                        responseCode: 401,
                        data: 'User Unauthorized'
                    };
                }
                else {
                    bodyparam.username = authMe.data.username;
                    bodyparam.usernameToken = authMe.data.username;
                    bodyparam.url = hosturl;
                    if (bodyparam.roleData) {
                        actionDetail = 'Update User Role';
                        posted = yield updateDataUserRole(bodyparam);
                    }
                    else if (bodyparam.periodData) {
                        actionDetail = 'Update User Period';
                        posted = yield updateDataUserPeriod(bodyparam);
                    }
                    else if (bodyparam.branchData) {
                        if (bodyparam.branchData.bankwide) {
                            actionDetail = 'Update User Branch Bankwide';
                            posted = yield updateDataUserBranchBankwide(bodyparam);
                        }
                        else {
                            actionDetail = 'Update User Branch Code';
                            posted = yield updateDataUserBranchCode(bodyparam);
                        }
                    }
                    else if (bodyparam.dateData) {
                        actionDetail = 'Update User Date';
                        posted = yield updateDataUserDate(bodyparam);
                    }
                    else if (bodyparam.userData) {
                        actionDetail = 'Update User Profile Data';
                        posted = yield updateDataUserProfileData(bodyparam);
                    }
                    else if (bodyparam.userSetting) {
                        actionDetail = 'Update User Setting';
                        posted = yield updateDataUserSetting(bodyparam);
                    }
                    else {
                        actionDetail = 'Update User Menu';
                        posted = yield updateDataUserMenu(bodyparam);
                    }
                    const entityLog = {
                        username: authMe.data.username,
                        moduleId: bodyparam.moduleId,
                        menuId: '',
                        screenId: 'General User Profile',
                        actionType: 'update',
                        actionDetail: actionDetail,
                        actionBeUrl: '/general/user/profile',
                        actionBeMethod: 'POST'
                    };
                    if (posted.responseCode == 200) {
                        entityLog.actionStatus = 'success';
                    }
                    else {
                        entityLog.actionStatus = 'failed';
                    }
                    redisClient.publish(entityLog);
                }
                return {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Last-Modified': new Date(posted.createdTime).toUTCString()
                    },
                    statusCode: posted.responseCode,
                    body: posted
                };
            }
            catch (err) {
                // TODO: Error logging
                console.log(err);
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 500,
                    body: {
                        status: false,
                        response_code: 500,
                        message: err.message
                    }
                };
            }
        });
    };
}
exports.default = makeUpdateUserProfile;
