import { Session, SessionId } from "../domain/session";
import { SessionMovie } from "../domain/SessionMovie";
import { SessionRepository } from "../domain/SessionRepository";

type SessionDb = { [key: string]: Session };

const sessions: SessionDb = {
	"1": new Session("1", "The first of many", []),
	"2": new Session("2", "Another one", [
		{
			movieId: "580489",
			proposalId: "1",
		},
		{
			movieId: "634649",
			proposalId: "2",
		},
	]),
};

export class SessionInMemoryRepository implements SessionRepository {
	get(id: SessionId): Promise<Session> {
		return new Promise((resolve) => {
			setTimeout(() => resolve(sessions[id]), 100);
		});
	}

	addMovie(session: Session, sessionMovie: SessionMovie): Promise<void> {
		sessions[session.id] = session;
		return new Promise((resolve) => {
			setTimeout(() => resolve(), 100);
		});
	}
}
