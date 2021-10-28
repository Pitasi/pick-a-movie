import { Ploc } from "../../common";
import { MovieId } from "../../movie";
import { SessionId } from "../../session";
import { GetVotesBySessionMovieUseCase } from "../domain/GetVotesBySessionMovieUseCase";
import { votesInitialState, VotesState } from "./VotesState";

export class VotesPloc extends Ploc<VotesState> {
	constructor(
		private getVotesBySessionMovieUseCase: GetVotesBySessionMovieUseCase,
	) {
		super(votesInitialState);
	}

	async search(sessionId: SessionId, movieId: MovieId) {
		const votes = await this.getVotesBySessionMovieUseCase.execute(sessionId, movieId);
		this.changeState({
			kind: "LoadedVotesState",
			votes,
		});
	}
}
