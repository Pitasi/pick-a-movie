import { Ploc } from "../../common";
import { GetMoviesUseCase } from "../domain";
import { moviesInitialState, MoviesState } from "./MoiesState";

export class MoviesPloc extends Ploc<MoviesState> {
	constructor(
		private getMoviesUseCase: GetMoviesUseCase,
	) {
		super(moviesInitialState);
	}

	async search(searchTerm: string) {
		const movies = await this.getMoviesUseCase.execute(searchTerm);
		this.changeState({
			kind: "LoadedMoviesState",
			movies,
			searchTerm,
		});
	}
}
