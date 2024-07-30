import express from 'express';

import { httpGetMovies } from './movies.controller';

export const moviesRouter = express.Router();

moviesRouter.get('/:title', httpGetMovies);
