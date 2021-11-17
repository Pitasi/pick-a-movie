import { MovieId } from "../../../movie";
import { Vote, VoteRepository, VoteSaveRequest } from "../../../vote";
import { SessionId } from "../../domain";

export class AddVoteToMovieUseCase {
	constructor(private readonly votesRepository: VoteRepository) {}

	async execute(sessionId: SessionId, movieId: MovieId): Promise<Vote> {
		const req: VoteSaveRequest = {
			author: "me", // TODO: take this from current session
			sessionId,
			movieId,
		};
		return await this.votesRepository.save(req);
	}
}
