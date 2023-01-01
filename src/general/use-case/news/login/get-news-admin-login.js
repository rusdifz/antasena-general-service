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
function makeGetNewsAdminLogin({ newsDb, moment }) {
    return function getNewsAdminLogin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield newsDb.getDataNewsAdminLogin(body);
                let result;
                if (news.status == true) {
                    let newsData = [];
                    if (news.data.length > 0) {
                        newsData = yield Promise.all(news.data.map(data => {
                            let updatedTime;
                            if (data.updated_time == null) {
                                updatedTime = null;
                            }
                            else {
                                updatedTime = moment(data.updated_time).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss');
                            }
                            const dataNews = {
                                newsId: data.id,
                                newsTitle: data.news_title,
                                newsImage: {
                                    imgUrl: data.img_url,
                                    imgName: data.img_name
                                },
                                newsOrder: data.news_order,
                                createdUser: data.created_user,
                                createdTime: moment(data.created_time).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'),
                                updatedUser: data.updated_user,
                                updatedTime: updatedTime
                            };
                            return dataNews;
                        }));
                    }
                    else {
                        newsData = news.data;
                    }
                    result = {
                        status: true,
                        responseCode: 200,
                        data: newsData,
                        info: {
                            allrec: news.countAll,
                            sentrec: newsData.length
                        },
                        filter: news.filter
                    };
                }
                else {
                    result = news;
                }
                return result;
            }
            catch (error) {
                throw new Error('usecase-getNewsLogin ' + error);
            }
        });
    };
}
exports.default = makeGetNewsAdminLogin;
