import { Session, SessionId } from "../domain/session";
import { SessionRepository } from "../domain/SessionRepository";

const u = "https://pick-a-movie-api.anto.pt/";

export class SessionInMemoryRepository implements SessionRepository {
	get(id: SessionId): Promise<Session> {
		return new Promise((resolve) => {
			setTimeout(() => resolve(sessions[id]), 100);
		});
	}

	save(session: Session): Promise<void> {
		sessions[session.id] = session;
		return new Promise((resolve) => {
			setTimeout(() => resolve(), 100);
		});
	}
}
