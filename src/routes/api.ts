import express, { Router } from 'express';

import { moviesRouter } from './movies/movies.routes';

const api: Router = express.Router();

api.use('/movies', moviesRouter);

export default api;
