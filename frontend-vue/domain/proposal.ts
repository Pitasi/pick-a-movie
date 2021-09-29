import { Movie } from "./movie";

export class Proposal {
  id: string;
  movie: Movie;
  votes: number;

  constructor(
    id: string,
    movie: Movie,
    votes: number,
  ) {
    this.id = id;
    this.movie = movie;
    this.votes = votes;
  }
}
