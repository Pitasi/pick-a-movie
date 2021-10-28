import { Ploc } from "../../common";
import { SearchMoviesUseCase } from "../domain";
import { moviesInitialState, MoviesState } from "./MoviesState";

export class MoviesPloc extends Ploc<MoviesState> {
	constructor(
		private searchMoviesUseCase: SearchMoviesUseCase,
	) {
		super(moviesInitialState);
	}

	async search(searchTerm: string) {
		const movies = await this.searchMoviesUseCase.execute(searchTerm);
		this.changeState({
			kind: "LoadedMoviesState",
			movies,
			searchTerm,
		});
	}
}
