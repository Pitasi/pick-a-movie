import { Session, SessionId } from '../domain/session';
import { SessionRepository } from '../domain/SessionRepository';

type SessionDb = { [key: string]: Session };

const sessions: SessionDb = {
	'1': new Session('1', 'The first of many', []),
	'2': new Session('2', 'Another one', [
		{
			movieId: '1',
		},
		{
			movieId: '2',
		},
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