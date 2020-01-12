import {MOVIE_DATA} from "../resources/movie-data";

export function getMovies() {
  return Promise.resolve(MOVIE_DATA);
}

export function getMovieById(id: string) {
  return Promise.resolve(
    MOVIE_DATA.find(movie => movie.id === id)
  );
}
