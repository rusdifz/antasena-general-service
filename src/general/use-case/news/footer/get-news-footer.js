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
function makeGetNewsFooter({ newsDb, moment }) {
    return function getNewsFooter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield newsDb.getDataNewsFooter(body);
                let result;
                if (data.status == true) {
                    let news = yield Promise.all(data.data.map(newsdata => {
                        const date = moment(newsdata.newsDatetime).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss');
                        delete newsdata.newsDatetime;
                        newsdata.newsDatetime = date;
                        return newsdata;
                    }));
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
                throw new Error('usecase-getNewsFooter ' + error);
            }
        });
    };
}
exports.default = makeGetNewsFooter;
