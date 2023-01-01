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
exports.internalDb = exports.userDb = exports.systemDb = exports.newsDb = void 0;
const mssql_1 = __importDefault(require("mssql"));
const news_db_1 = __importDefault(require("./news-db"));
const system_db_1 = __importDefault(require("./system-db"));
const user_db_1 = __importDefault(require("./user-db"));
const internal_db_1 = __importDefault(require("./internal-db"));
require('dotenv').config();
const environment = process.env.ENVIRONMENT;
// console.log(environment)
let server = process.env.DB_SERVER_DEV;
let user = process.env.DB_USER_DEV;
let password = process.env.DB_PASS_DEV;
let database = process.env.DB_DATABASE_DEV;
let port = process.env.DB_PORT_DEV;
const pool = new mssql_1.default.ConnectionPool({
    user: user,
    password: password,
    server: server,
    database: database,
    port: Number(port),
    parseJSON: true,
    pool: {
        max: 20,
        min: 0
    },
    "options": {
        "encrypt": true,
        "enableArithAbort": true
    }
});
pool.connect((err) => {
    if (!err)
        console.log('DB koneksi master suksess');
    else
        console.log('DB koneksi master error : ' + err);
});
function Query(sintax) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const db = pool;
        db.connect((err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return reject(new Error(err));
            }
            yield db.request().query(sintax, (err, results) => {
                if (err) {
                    return reject(new Error("querry error " + err));
                }
                else {
                    resolve(results);
                }
            });
            if (environment === 'development') {
                console.log("execQuery", sintax);
            }
        }));
    }));
}
function QueryGet(sintax, insert) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const db = pool;
        db.connect((err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return reject(new Error(err));
            }
            var query = yield db.request().query(sintax, (err, results) => {
                if (err) {
                    resolve({ status: false, data: err });
                }
                else {
                    resolve({ status: true, data: results });
                }
            });
            if (environment === 'development') {
                console.log("execQuery", sintax);
            }
        }));
    }));
}
function QueryTransaction(sintax, insert) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const db = pool;
        const transaction = db.transaction();
        console.log('trsn success');
        yield transaction.begin((err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                reject(new Error('SQL Transaction' + err));
            }
            console.log('masuk');
            const request = transaction.request();
            var query = yield request.query(sintax, (err, results) => {
                if (err) {
                    transaction.rollback(err => {
                        if (err) {
                            console.log('rollback error');
                        }
                        else {
                            console.log('rollback success');
                        }
                    });
                    resolve({ status: false, data: err });
                }
                else {
                    transaction.commit(err => {
                        if (err) {
                            console.log('commit error');
                        }
                        else {
                            console.log('commit success');
                        }
                    });
                    resolve({ status: true, data: results });
                }
            });
            // db.close()
            if (environment === 'development') {
                console.log("execQuery", sintax);
            }
        }));
    }));
}
const newsDb = (0, news_db_1.default)({ Query, QueryTransaction, QueryGet });
exports.newsDb = newsDb;
const systemDb = (0, system_db_1.default)({ QueryGet });
exports.systemDb = systemDb;
const userDb = (0, user_db_1.default)({ Query, QueryGet, QueryTransaction });
exports.userDb = userDb;
const internalDb = (0, internal_db_1.default)({ Query, QueryTransaction, QueryGet });
exports.internalDb = internalDb;
const generalModel = Object.freeze({
    newsDb,
    systemDb,
    userDb,
    internalDb
});
exports.default = (generalModel);
