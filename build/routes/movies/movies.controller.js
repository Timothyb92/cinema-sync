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
exports.httpGetMovies = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
function httpGetMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const movieTitle = req.params.title;
        console.log(movieTitle);
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${config_1.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&query=${movieTitle}`;
        const results = (yield axios_1.default.get(url)).data;
        console.log(url);
        console.log('HIT ENDPOINT');
        return res.json(results);
    });
}
exports.httpGetMovies = httpGetMovies;
