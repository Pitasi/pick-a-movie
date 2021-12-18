import { Session } from "@/core";
import { Vote, VoteRepository, VoteSaveRequest } from "../domain";

const data: { [key: string]: { [key: string]: Vote[] } } = {
	"2": {
		"1": [
			{
				author: "antonio",
				date: new Date("2020-12-12T12:12:12"),
				movieId: "1",
				sessionId: "2",
			},
		],
	},
};

export class VoteInMemoryRepository implements VoteRepository {
	getBySessionMovie(session: Session, movieId: string): Promise<Vote[]> {
		return Promise.resolve(data[session.id]?.[movieId] ?? []);
	}

	save(req: VoteSaveRequest): Promise<Vote> {
		if (!data[req.session.id]) {
			data[req.session.id] = {};
		}

		if (!data[req.session.id][req.movieId]) {
			data[req.session.id][req.movieId] = [];
		}

		const vote = new Vote(req.session.id, req.movieId, "me", new Date());
		data[req.session.id][req.movieId].push(vote);

		return Promise.resolve(vote);
	}
}
