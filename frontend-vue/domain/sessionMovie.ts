import { Movie } from "./movie";

export class SessionMovie {
  movie: Movie;
  votes: number;

  constructor(
    movie: Movie,
    votes: number,
  ) {
    this.movie = movie;
    this.votes = votes;
  }
}
