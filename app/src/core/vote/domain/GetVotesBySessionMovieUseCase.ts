import { MovieId } from "../../movie";
import { Session } from "../../session";
import { Vote } from "./vote";
import { VoteRepository } from "./VoteRepository";

export class GetVotesBySessionMovieUseCase {
	constructor(private readonly voteRepository: VoteRepository) {}

	async execute(session: Session, movieId: MovieId): Promise<Vote[]> {
		return this.voteRepository.getBySessionMovie(session, movieId);
	}
}
