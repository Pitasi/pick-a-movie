import { Session, SessionId } from "../domain/session";
import { SessionRepository } from "../domain/SessionRepository";

type SessionDb = { [key: string]: Session };

const sessions: SessionDb = {
	"1": new Session("1", "The first of many", []),
	"2": new Session("2", "Another one", [
		{
			movieId: "1",
		},
		{
			movieId: "2",
		},
	]),
};

export class SessionInMemoryRepository implements SessionRepository {
	get(id: SessionId): Promise<Session> {
		console.log("FETCH", id);
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
