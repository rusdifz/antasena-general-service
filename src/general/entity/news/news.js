"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildMakeNews(moment) {
    return function makeNews({ newsId = '', moduleId = '', usernameToken = '', newsDatetime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'), newsTitle = '', newsText = '', newsOrder = 0, imgUrl = '', imgName = '', createdTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss'), updatedTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss') } = {}) {
        // if(!newsTitle){
        //   throw new Error('newsTitle must be exist')
        // }
        // if(!newsText){
        //   throw new Error('newsText must be exist')
        // }
        return Object.freeze({
            getNewsId: () => newsId,
            getModuleId: () => moduleId,
            getUsernameToken: () => usernameToken,
            getNewsDatetime: () => newsDatetime,
            getNewsTitle: () => newsTitle,
            getNewsText: () => newsText,
            getNewsOrder: () => newsOrder,
            getImgUrl: () => imgUrl,
            getImgName: () => imgName,
            getCreatedTime: () => createdTime,
            getUpdatedTime: () => updatedTime
        });
    };
}
exports.default = buildMakeNews;
