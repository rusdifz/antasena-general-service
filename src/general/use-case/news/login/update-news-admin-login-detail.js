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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
require('dotenv').config();
function makeUpdateNewsAdminLoginDetail({ newsDb, makeNews, moment }) {
    return function updateNewsAdminLoginDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('body', body);
                let update;
                let result;
                const validasiBusinees = yield newsDb.validasiNews({ info: "update", id: body.id, newsOrder: body.newsOrder });
                if (validasiBusinees.status == true) {
                    if (body.newsImage) {
                        if (body.newsImage == '' || body.newsImage == undefined || body.newsImage == null) {
                            console.log('image kosong');
                            const entity = {
                                newsId: body.newsId,
                                newsTitle: body.newsTitle,
                                newsOrder: body.newsOrder,
                                usernameToken: body.usernameToken
                            };
                            const entityIn = yield makeNews(entity);
                            update = yield newsDb.updateDataNewsAdminLoginDetail(Object.assign(Object.assign({}, entityIn), { info: 'no image' }));
                        }
                        else {
                            console.log('image ada');
                            let nameurl;
                            if (body.url == 'localhost:7001') {
                                nameurl = 'http://' + body.url + '/general/news/image/';
                            }
                            else {
                                nameurl = process.env.IMGURL + '/general/news/image/';
                            }
                            const imageUrl = nameurl + body.newsId + '.png';
                            const basedir = __dirname;
                            const dirname = basedir.toString().replace(/login/g, '');
                            const imageSave = dirname + 'image/' + body.newsId + '.png';
                            const buffer = Buffer.from(body.newsImage.data);
                            fs_1.default.writeFile(imageSave, buffer, 'binary', function (err) {
                                if (err) {
                                    console.log("There was an error writing the image");
                                }
                                else {
                                    console.log("file was written");
                                }
                            });
                            const entity = {
                                usernameToken: body.usernameToken,
                                newsId: body.newsId,
                                newsTitle: body.newsTitle,
                                newsOrder: body.newsOrder,
                                imgUrl: imageUrl,
                                imgName: body.newsId + '.png'
                            };
                            console.log('entity', entity);
                            const entityIn = yield makeNews(entity);
                            update = yield newsDb.updateDataNewsAdminLoginDetail(Object.assign(Object.assign({}, entityIn), { info: 'img' }));
                        }
                    }
                    else {
                        console.log('news image tidak ada');
                        const entity = {
                            usernameToken: body.usernameToken,
                            newsId: body.newsId,
                            newsTitle: body.newsTitle,
                            newsOrder: body.newsOrder
                        };
                        const entityIn = yield makeNews(entity);
                        update = yield newsDb.updateDataNewsAdminLoginDetail(Object.assign(Object.assign({}, entityIn), { info: 'no image' }));
                    }
                    result = {
                        status: update.status,
                        responseCode: update.code,
                        data: update.message
                    };
                }
                else {
                    result = {
                        status: false,
                        responseCode: 406,
                        data: validasiBusinees.data
                    };
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    };
}
exports.default = makeUpdateNewsAdminLoginDetail;
