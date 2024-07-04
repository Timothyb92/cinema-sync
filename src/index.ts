import express, { Express, Request, Response } from 'express';
import { API_KEY } from './config';
import https from 'https';

console.log(API_KEY);

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('listening on 3000')
})

app.get('/', (req, res) => {
  res.send(`ROOT get`)
})

app.get('/test', (req, res) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&query=spiderman` 

  https.get(url, (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk;
    })

    res.on('end', () => {
      const parsedData = JSON.parse(data);
      console.log(parsedData)
    })
  })
})
