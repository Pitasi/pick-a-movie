export class Movie {
  id: Uid;
  title: string;
  poster?: URL;

  constructor(
    id: Uid,
    title: string,
    poster?: URL,
  ) {
    this.id = id;
    this.title = title;
    this.poster = poster;
  }
}
