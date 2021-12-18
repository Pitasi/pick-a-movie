import { MovieId, Session, Vote, VoteRestRepository } from "@/core";
import { GetVotesBySessionMovieUseCase } from "@/core/vote/domain/GetVotesBySessionMovieUseCase";
import { Query } from "@/lib/api/query";

export const getVotes = async (
	session: Session,
	movieId: MovieId
): Promise<Vote[]> => {
	const votesRepository = new VoteRestRepository();
	const getVotesBySessionMovieUseCase = new GetVotesBySessionMovieUseCase(
		votesRepository
	);
	return await getVotesBySessionMovieUseCase.execute(session, movieId);
};

export const VotesCountQuery = (session: Session, movieId: MovieId) =>
	new Query(`votescount-${movieId}`, () => getVotes(session, movieId));
