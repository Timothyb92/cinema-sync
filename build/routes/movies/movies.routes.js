"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesRouter = void 0;
const express_1 = __importDefault(require("express"));
const movies_controller_1 = require("./movies.controller");
exports.moviesRouter = express_1.default.Router();
exports.moviesRouter.get('/:title', movies_controller_1.httpGetMovies);
