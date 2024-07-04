"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const https_1 = __importDefault(require("https"));
console.log(config_1.API_KEY);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, () => {
    console.log('listening on 3000');
});
app.get('/', (req, res) => {
    res.send(`ROOT get`);
});
app.get('/test', (req, res) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${config_1.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&query=spiderman`;
    https_1.default.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            const parsedData = JSON.parse(data);
            console.log(parsedData);
        });
    });
});
