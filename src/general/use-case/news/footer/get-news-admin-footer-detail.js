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
function makeGetNewsAdminFooterDetail({ newsDb, moment }) {
    return function getNewsAdminFooterDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield newsDb.getDataNewsAdminFooterDetail(body);
                let result;
                if (data.status == true) {
                    let news;
                    if (data.field == 'filled') {
                        let updatedTime;
                        if (data.data.updated_time == null) {
                            updatedTime = null;
                        }
                        else {
                            updatedTime = moment(data.data.updated_time).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss');
                        }
                        news = {
                            newsId: data.data.id,
                            newsTitle: data.data.news_title,
                            newsDatetime: moment(data.data.news_datetime).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'),
                            newsText: data.data.news_text,
                            createdUser: data.data.created_user,
                            createdTime: moment(data.data.created_time).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'),
                            updatedUser: data.data.updated_user,
                            updatedTime: updatedTime
                        };
                    }
                    else {
                        news = data.data;
                    }
                    result = {
                        status: true,
                        responseCode: 200,
                        data: news
                    };
                }
                else {
                    result = data;
                }
                return result;
            }
            catch (error) {
                throw new Error('usecase-getNewsAdminFooterDetail ' + error);
            }
        });
    };
}
exports.default = makeGetNewsAdminFooterDetail;
