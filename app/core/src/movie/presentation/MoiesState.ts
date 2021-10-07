import { Movie } from "../domain";

export interface CommonMoviesState {
	searchTerm: string;
}

export interface LoadingMoviesState {
	kind: "LoadingMoviesState";
}

export interface LoadedMoviesState {
	kind: "LoadedMoviesState";
	movies: Movie[];
}

export type MoviesState = CommonMoviesState & (
	LoadingMoviesState | LoadedMoviesState
);

export const moviesInitialState: MoviesState = {
	kind: "LoadingMoviesState",
	searchTerm: "",
};
