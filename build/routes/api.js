"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_routes_1 = require("./movies/movies.routes");
const api = express_1.default.Router();
api.use('/movies', movies_routes_1.moviesRouter);
exports.default = api;
