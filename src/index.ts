import express, { Express, Request, Response } from 'express';

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('listening on 3000')
})

app.get('/', (req, res) => {
  res.send(`ROOT get`)
})
