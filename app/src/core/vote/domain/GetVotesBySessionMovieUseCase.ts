import { MovieId } from "../../movie";
import { SessionId } from "../../session";
import { Vote } from "./vote";
import { VoteRepository } from "./VoteRepository";

export class GetVotesBySessionMovieUseCase {
	constructor(private readonly voteRepository: VoteRepository) {}

	async execute(sessionId: SessionId, movieId: MovieId): Promise<Vote[]> {
		return this.voteRepository.getBySessionMovie(sessionId, movieId);
	}
}
