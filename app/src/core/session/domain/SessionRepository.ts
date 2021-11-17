import { Session, SessionId } from "./session";

export interface SessionRepository {
	get(id: SessionId): Promise<Session>;
	save(session: Session): Promise<void>;
}
