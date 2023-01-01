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
function makeGetNewsAdminFooter({ newsDb, moment }) {
    return function getNewsAdminFooter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield newsDb.getDataNewsAdminFooter(body);
                console.log('data', data);
                let result;
                if (data.status == true) {
                    let news = [];
                    if (data.data.length > 0) {
                        news = yield Promise.all(data.data.map(newsdata => {
                            let updatedTime;
                            if (newsdata.updated_time == null) {
                                updatedTime = null;
                            }
                            else {
                                updatedTime = moment(newsdata.updated_time).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss');
                            }
                            const data = {
                                newsId: newsdata.id,
                                newsTitle: newsdata.news_title,
                                newsDatetime: moment(newsdata.news_datetime).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'),
                                newsText: newsdata.news_text,
                                createdUser: newsdata.created_user,
                                createdTime: moment(newsdata.created_time).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'),
                                updatedUser: newsdata.updated_user,
                                updatedTime: updatedTime
                            };
                            return data;
                        }));
                    }
                    else {
                        news = [];
                    }
                    result = {
                        status: true,
                        responseCode: 200,
                        data: news,
                        info: {
                            allrec: data.countAll,
                            sentrec: news.length
                        },
                        filter: data.filter
                    };
                }
                else {
                    result = data;
                }
                return result;
            }
            catch (error) {
                throw new Error('usecase-getNewsAdminFooter ' + error);
            }
        });
    };
}
exports.default = makeGetNewsAdminFooter;
