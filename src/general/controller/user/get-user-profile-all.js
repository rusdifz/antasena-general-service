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
function makeGetUserProfileAll({ getDataUserProfileAll, internalServer, redisClient }) {
    return function getUserProfileAll(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bodyparam = httpRequest.query;
                const token = { token: httpRequest.token };
                const authMe = yield internalServer.authentication(token);
                console.log('authme', authMe);
                let posted;
                if (authMe.status == false) {
                    console.log('auth false');
                    posted = {
                        status: false,
                        responseCode: 401,
                        data: 'User Unauthorized'
                    };
                }
                else {
                    console.log('auth true');
                    bodyparam.username = authMe.data.username;
                    posted = yield getDataUserProfileAll(bodyparam);
                    const entityLog = {
                        username: authMe.data.username,
                        moduleId: bodyparam.moduleId,
                        menuId: '',
                        screenId: 'General User Profile',
                        actionType: 'get',
                        actionDetail: 'Show List Data User Profile All',
                        actionBeUrl: '/general/user/profile',
                        actionBeMethod: 'GET'
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
exports.default = makeGetUserProfileAll;
