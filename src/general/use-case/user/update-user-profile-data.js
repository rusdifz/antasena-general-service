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
function makeUpdateUserProfileData({ userDb, makeUser }) {
    return function updateUserProfileData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('usecase', body);
                let nameurl;
                if (body.url == 'localhost:7001') {
                    nameurl = 'http://' + body.url + '/general/user/profile/image/';
                }
                else {
                    nameurl = process.env.IMGURL + '/general/user/profile/image/';
                }
                let insert;
                if (body.userData.img) {
                    const namaimage = nameurl + body.username + '_' + Date.now() + '.png';
                    const imageSave = __dirname + '/image/' + body.username + '_' + Date.now() + '.png';
                    console.log('nama', namaimage);
                    if (body.userData.img != '' || body.userData.img != null) {
                        if (body.userData.nickname) {
                            const buffer = Buffer.from(body.userData.img.data);
                            fs_1.default.writeFile(imageSave, buffer, 'binary', function (err) {
                                if (err) {
                                    console.log("There was an error writing the image");
                                }
                                else {
                                    console.log("file was written");
                                }
                            });
                            const entity = {
                                username: body.username,
                                usernameToken: body.usernameToken,
                                nickname: body.userData.nickname,
                                img: namaimage,
                                moduleId: body.moduleId
                            };
                            // console.log('enty', entity);
                            const validasiProfileData = yield makeUser(entity);
                            insert = yield userDb.updateDataUserProfileData(Object.assign(Object.assign({}, validasiProfileData), { info: 'image and nickname' }));
                        }
                        else {
                            const buffer = Buffer.from(body.userData.img.data);
                            fs_1.default.readdir(__dirname + '/image/', (err, files) => {
                                files.forEach(file => {
                                    if (file.split('_')[0].toString() == body.username) {
                                        fs_1.default.unlink(__dirname + '/image/' + file, (err) => {
                                            if (err) {
                                                console.error(err);
                                                return;
                                            }
                                        });
                                    }
                                });
                            });
                            fs_1.default.writeFile(imageSave, buffer, 'binary', function (err) {
                                if (err) {
                                    console.log("There was an error writing the image");
                                }
                                else {
                                    console.log("file was written");
                                }
                            });
                            const entity = {
                                username: body.username,
                                usernameToken: body.usernameToken,
                                img: namaimage,
                                moduleId: body.moduleId
                            };
                            console.log('enty', entity);
                            const validasiProfileData = yield makeUser(entity);
                            insert = yield userDb.updateDataUserProfileData(Object.assign(Object.assign({}, validasiProfileData), { info: 'just image' }));
                        }
                    }
                    else {
                        const entity = {
                            username: body.username,
                            usernameToken: body.usernameToken,
                            nickname: body.userData.nickname,
                            moduleId: body.moduleId
                        };
                        const validasiProfileData = yield makeUser(entity);
                        insert = yield userDb.updateDataUserProfileData(validasiProfileData);
                    }
                }
                else {
                    const entity = {
                        username: body.username,
                        usernameToken: body.usernameToken,
                        nickname: body.userData.nickname,
                        moduleId: body.moduleId
                    };
                    const validasiProfileData = yield makeUser(entity);
                    insert = yield userDb.updateDataUserProfileData(validasiProfileData);
                }
                const result = insert;
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    };
}
exports.default = makeUpdateUserProfileData;
