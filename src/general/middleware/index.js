"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalServer = void 0;
const internal_service_1 = __importDefault(require("./internal-service"));
const helpers_1 = require("../helpers");
const internalServer = (0, internal_service_1.default)({ consulService: helpers_1.consulService });
exports.internalServer = internalServer;
const generalMiddleware = Object.freeze({
    internalServer
});
exports.default = generalMiddleware;
