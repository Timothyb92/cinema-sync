import express, { Express, Request, Response } from 'express';
import { API_KEY } from './config';
import axios from 'axios';

console.log(API_KEY);

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('listening on 3000');
});

app.get('/', (req, res) => {
  res.send(`ROOT get`);
});

app.get('/test', async (req, res) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&query=street-fighter`;

  const results = (await axios.get(url)).data;
  console.log(results);
  console.log('HIT ENDPOINT');
  return await res.json(results);
});
