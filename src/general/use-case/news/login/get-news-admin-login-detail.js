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
function makeGetNewsAdminLoginDetail({ newsDb, moment }) {
    return function getNewsAdminLoginDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield newsDb.getDataNewsAdminLoginDetail(body);
                let result;
                if (news.status == true) {
                    let data;
                    if (news.field == 'filled') {
                        let updatedTime;
                        if (news.updated_time == null) {
                            updatedTime = null;
                        }
                        else {
                            updatedTime = moment(news.updated_time).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss');
                        }
                        data = {
                            newsId: news.data.news_id,
                            newsTitle: news.data.news_title,
                            newsImage: {
                                imgUrl: news.data.img_url,
                                imgName: news.data.img_name
                            },
                            newsOrder: news.data.news_order,
                            createdUser: news.data.created_user,
                            createdTime: moment(news.created_time).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'),
                            updatedUser: news.data.updated_user,
                            updatedTime: updatedTime
                        };
                    }
                    else {
                        data = news.data;
                    }
                    result = {
                        status: news.status,
                        responseCode: 200,
                        data: data
                    };
                }
                else {
                    result = news;
                }
                return result;
            }
            catch (error) {
                throw new Error('usecase-getNewsAdminLoginDetail ' + error);
            }
        });
    };
}
exports.default = makeGetNewsAdminLoginDetail;
