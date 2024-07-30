// import express, { Express, Request, Response } from 'express';
// import { API_KEY } from './config';
// import axios from 'axios';

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
import http from 'http';
import app from './app';

const server = http.createServer(app);

const PORT = 3000;

async function startServer() {
  server.listen(PORT, () => {
    console.log(`index.ts listening on port ${PORT}`);
  });
}

startServer();
