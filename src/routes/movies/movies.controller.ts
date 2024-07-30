import { Request, Response } from 'express';
import axios from 'axios';
import { API_KEY } from '../../config';

export async function httpGetMovies(
  req: Request,
  res: Response
): Promise<Response> {
  const movieTitle = req.params.title;
  console.log(movieTitle);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&query=${movieTitle}`;

  const results = (await axios.get(url)).data;
  console.log(url);
  console.log('HIT ENDPOINT');
  return res.json(results);
}
