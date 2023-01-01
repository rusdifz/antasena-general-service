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
function makeCreateNewsAdminLoginDetail({ newsDb, makeNews, moment }) {
    return function createNewsAdminLoginDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validasiBusinees = yield newsDb.validasiNews(body);
                let result;
                if (validasiBusinees.status == true) {
                    if (!body.newsImage) {
                        throw new Error('newsImage must be exist');
                    }
                    if (body.newsImage == '' || body.newsImage == undefined || body.newsImage == null) {
                        throw new Error('newsImage not be null');
                    }
                    const getIdbefore = yield newsDb.getIdBeforeLogin();
                    // console.log('id',  getIdbefore);
                    let nameurl;
                    if (body.url == 'localhost:7001') {
                        nameurl = 'http://' + body.url + '/general/news/image/';
                    }
                    else {
                        nameurl = process.env.IMGURL + '/general/news/image/';
                    }
                    const imageUrl = nameurl + getIdbefore.data + '.png';
                    const basedir = __dirname;
                    const dirname = basedir.toString().replace(/login/g, '');
                    const imageSave = dirname + 'image/' + getIdbefore.data + '.png';
                    console.log('save', imageSave);
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
                        newsTitle: body.newsTitle,
                        newsOrder: body.newsOrder,
                        imgUrl: imageUrl,
                        imgName: getIdbefore.data + '.png'
                    };
                    const entityIn = yield makeNews(entity);
                    const create = yield newsDb.createDataNewsAdminLoginDetail(entityIn);
                    result = {
                        status: create.status,
                        responseCode: create.code,
                        data: create.message,
                        id: create.id
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
exports.default = makeCreateNewsAdminLoginDetail;
