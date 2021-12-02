import { MovieId, SessionId, Vote, VoteInMemoryRepository } from "@/core";
import { GetVotesBySessionMovieUseCase } from "@/core/vote/domain/GetVotesBySessionMovieUseCase";
import { Query } from "@/lib/api/query";

export const getVotes = async (
	sessionId: SessionId,
	movieId: MovieId
): Promise<Vote[]> => {
	const votesRepository = new VoteInMemoryRepository();
	const getVotesBySessionMovieUseCase = new GetVotesBySessionMovieUseCase(
		votesRepository
	);
	return await getVotesBySessionMovieUseCase.execute(sessionId, movieId);
};

export const VotesCountQuery = (sessionId: SessionId, movieId: MovieId) =>
	new Query(`votescount-${movieId}`, () => getVotes(sessionId, movieId));
