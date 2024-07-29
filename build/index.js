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
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const axios_1 = __importDefault(require("axios"));
console.log(config_1.API_KEY);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, () => {
    console.log('listening on 3000');
});
app.get('/', (req, res) => {
    res.send(`ROOT get`);
});
app.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${config_1.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&query=street-fighter`;
    const results = (yield axios_1.default.get(url)).data;
    console.log(results);
    console.log('HIT ENDPOINT');
    return yield res.json(results);
}));
