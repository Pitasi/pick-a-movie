import { Movie } from '../../movie';

export type SessionId = string;
export type SessionTitle = string;

export class Session {
	readonly id: SessionId;
	readonly title: SessionTitle;
	readonly movies: readonly Movie[];

	constructor(id: SessionId, title: SessionTitle, movies: readonly Movie[]) {
		this.id = id;
		this.title = title;
		this.movies = movies;
	}

	addMovie(movie: Movie): Session {
		return new Session(this.id, this.title, [...this.movies, movie]);
	}
}