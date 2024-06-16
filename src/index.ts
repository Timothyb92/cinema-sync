import express, { Express, Request, Response } from 'express';
import { API_KEY } from './config';

console.log(API_KEY);

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('listening on 3000')
})

app.get('/', (req, res) => {
  res.send(`ROOT get`)
})
