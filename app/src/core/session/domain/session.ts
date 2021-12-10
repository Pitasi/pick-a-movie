import { SessionMovie } from "./SessionMovie";

export type SessionId = string;
export type SessionTitle = string;

export class Session {
	constructor(
		readonly id: SessionId,
		readonly title: SessionTitle,
		readonly movies: readonly SessionMovie[]
	) {
		this.id = id;
		this.title = title;
		this.movies = movies;
	}

	toJSON(): Session {
		return { ...this };
	}
}
