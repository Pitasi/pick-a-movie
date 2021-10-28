import { MovieId } from "../../movie";
import { SessionId } from "../../session";

export type UserId = string;

export class Vote {
	constructor (
		public sessionId: SessionId,
		public movieId: MovieId,
		public author: UserId,
		public date: Date,
	) { }
}