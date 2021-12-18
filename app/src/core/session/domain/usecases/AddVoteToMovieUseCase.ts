import { MovieId } from "../../../movie";
import { Vote, VoteRepository, VoteSaveRequest } from "../../../vote";
import { Session } from "../session";

export class AddVoteToMovieUseCase {
	constructor(private readonly votesRepository: VoteRepository) {}

	async execute(session: Session, movieId: MovieId): Promise<Vote> {
		const req: VoteSaveRequest = {
			session,
			movieId,
		};
		return await this.votesRepository.save(req);
	}
}
