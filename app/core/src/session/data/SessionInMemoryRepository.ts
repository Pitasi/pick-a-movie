import { Session, SessionId } from '../domain/session';
import { SessionRepository } from '../domain/SessionRepository';

type SessionDb = { [key: string]: Session };

const sessions: SessionDb = {
	'1': new Session('1', 'The first of many', []),
	'2': new Session('2', 'Another one', [
		{ id: '1', title: 'The Godfather', posterPath: null },
		{ id: '2', title: 'Star Wars', posterPath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fVqKwpvobwWy0P1UImZWIDuw4RI.jpg" },
	]),
};

export class SessionInMemoryRepository implements SessionRepository {
	get(id: SessionId): Promise<Session> {
		return Promise.resolve(sessions[id]);
	}

	save(session: Session): Promise<void> {
		sessions[session.id] = session;
		return Promise.resolve();
	}
}