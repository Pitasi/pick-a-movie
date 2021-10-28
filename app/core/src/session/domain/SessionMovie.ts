import { Movie, MovieId } from "../../movie";

export class SessionMovie {
	movieId: MovieId;

	constructor(movie: Movie) {
		this.movieId = movie.id;
	}
}
