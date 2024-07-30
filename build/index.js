"use strict";
// import express, { Express, Request, Response } from 'express';
// import { API_KEY } from './config';
// import axios from 'axios';
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
// console.log(API_KEY);
// const app = express();
// app.use(express.json());
// app.listen(3000, () => {
//   console.log('listening on 3000');
// });
// app.get('/', (req, res) => {
//   res.send(`ROOT get`);
// });
//
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const server = http_1.default.createServer(app_1.default);
const PORT = 3000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        server.listen(PORT, () => {
            console.log(`index.ts listening on port ${PORT}`);
        });
    });
}
startServer();
