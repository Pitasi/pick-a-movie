import { MovieId } from "../../movie";
import { Session } from "../../session";
import { Vote } from "./vote";

export interface VoteSaveRequest {
	session: Session;
	movieId: MovieId;
}

export interface VoteRepository {
	getBySessionMovie(session: Session, movieId: MovieId): Promise<Vote[]>;

	save(req: VoteSaveRequest): Promise<Vote>;
}
