import { Vote, VoteRepository, VoteSaveRequest } from "../domain";

const data: { [key: string]: { [key: string]: Vote[] } } = {};

export class VoteInMemoryRepository implements VoteRepository {
	getBySessionMovie(sessionId: string, movieId: string): Promise<Vote[]> {
		return Promise.resolve(data[sessionId]?.[movieId]);
	}

	save(req: VoteSaveRequest): Promise<Vote> {
		if (!data[req.sessionId]) {
			data[req.sessionId] = {};
		}

		if (!data[req.sessionId][req.movieId]) {
			data[req.sessionId][req.movieId] = [];
		}

		const vote = new Vote(req.sessionId, req.movieId, req.author, new Date());
		data[req.sessionId][req.movieId].push(vote);

		return Promise.resolve(vote);
	}
}
