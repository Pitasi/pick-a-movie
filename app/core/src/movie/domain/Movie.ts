export type MovieId = string;
export type MovieTitle = string;
export type PosterPath = string;

export interface Movie {
	id: MovieId;
	title: MovieTitle;
	posterPath?: PosterPath;
}
