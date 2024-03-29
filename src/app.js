"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const general_1 = __importDefault(require("./general"));
// import {consulService} from './general/helpers' 
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT_APP;
// const consulIndex = {
//     id: 'General Service', 
//     name: 'general-service'
// }
// consulService.setConsul(consulIndex)
app.use('/general', general_1.default);
app.listen(port, () => console.log(`Server is listening on port ${port}`));
//jangan lupa build rm -rf src/ && tsc -p .
