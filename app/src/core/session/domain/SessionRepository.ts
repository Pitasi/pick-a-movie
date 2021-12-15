import { Session, SessionId } from "./session";
import { SessionMovie } from "./SessionMovie";

export interface SessionRepository {
	get(id: SessionId): Promise<Session | undefined>;
	addMovie(session: Session, sessionMovie: SessionMovie): Promise<void>;
}
