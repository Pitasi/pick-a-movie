import { SessionMovie } from "./sessionMovie";

export class Session {
  id: Uid;
  title: string;
  movies: SessionMovie[];

  constructor(
    id: Uid,
    title: string,
    movies: SessionMovie[],
  ) {
    this.id = id;
    this.title = title;
    this.movies = movies;
  }
}
