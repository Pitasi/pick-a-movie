import { Movie, MovieId } from "../../movie";
import { Session, SessionId } from "../../session";
import { Vote } from "./vote";

export interface VoteSaveRequest {
	sessionId: SessionId;
	movieId: MovieId;
	author: string;
}

export interface VoteRepository {
	getBySessionMovie(sessionId: SessionId, movieId: MovieId): Promise<Vote[]>;

	save(req: VoteSaveRequest): Promise<Vote>;
}