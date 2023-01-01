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
function makeGetUserNotification({ userDb, moment }) {
    return function getUserNotification(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userDb.getDataUserNotification(body);
                let result;
                if (user.status == true) {
                    let dataNotif;
                    if (user.data.length > 0) {
                        dataNotif = yield Promise.all(user.data.map(notif => {
                            const data2 = {
                                id: notif.id,
                                datetime: moment(notif.datetime).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm'),
                                title: notif.title,
                                titleGlob: notif.title_glob,
                                message: notif.message,
                                messageGlob: notif.message_glob,
                                status: notif.status
                            };
                            return data2;
                        }));
                    }
                    else {
                        dataNotif = user.data;
                    }
                    result = {
                        status: true,
                        responseCode: 200,
                        data: dataNotif,
                        info: {
                            allrec: user.countAll,
                            sentrec: user.data.length
                        }
                    };
                }
                else {
                    result = user;
                }
                return result;
            }
            catch (error) {
                throw new Error('usecase-getUserNotification ' + error);
            }
        });
    };
}
exports.default = makeGetUserNotification;
