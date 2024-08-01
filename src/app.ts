import express, { Express, Request, Response } from 'express';

import api from './routes/api';

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/', api);

export default app;
