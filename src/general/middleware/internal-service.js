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
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
const environment = process.env.ENVIRONMENT;
function makeInternalServer({ consulService }) {
    return Object.freeze({
        authentication
        // sendLogRequest
    });
    function authentication(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    // const result = await consulService.lookupService({service: 'auth-service'})
                    // console.log('res', result);
                    // const response = await http.request({
                    //     host: result[0].ServiceAddress,
                    //     port: result[0].ServicePort,
                    //     path: '/account/get',
                    //     method: 'GET'
                    // })
                    // res.send(response)
                    // const host = result[0].ServiceAddress
                    // const port = result[0].ServicePort
                    // const path = '/master/auth/me'
                    // const url2 = 'https://'+host+':'+port+path
                    const url = 'https://api-dev.adapro.tech/master/auth/me';
                    // const url = process.env.URL_MASTER+'/master/auth/me'
                    const token = body.token;
                    (0, axios_1.default)({
                        method: 'POST',
                        url: url,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    })
                        .then(result => {
                        // console.log('data',result)
                        resolve(result.data);
                    })
                        .catch(err => {
                        console.log('err', err);
                        // reject(new Error(err))
                        resolve(err.response.data);
                    });
                });
            });
        });
    }
    // async function sendLogRequest(body){
    //   return new Promise(function(resolve, reject) {
    //     const url = process.env.URL_HOST_LOG+'/activity/detail'
    //     // const url = 'http://localhost:7005/log/activity/detail'
    //     axios ({
    //       method: 'PUT',
    //       url: url,
    //       data: {
    //         ...body
    //       },
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     .then(result =>{
    //       // console.log('masuk');
    //       resolve(result.data)
    //     })
    //     .catch(err =>{
    //       // console.log('err',err.response.data)
    //       resolve(err.response.data)
    //     })
    //   })
    // }
}
exports.default = makeInternalServer;
