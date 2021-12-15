import { GetSessionByIdUseCase, Session, SessionId } from "@/core";
import { SessionRestRepository } from "@/core/session/data/SessionRestRepository";
import { Query } from "@/lib/api/query";

export const getSession = (id: SessionId): Promise<Session | undefined> => {
	const sessionRepository = new SessionRestRepository();
	const getSessionByIdUseCase = new GetSessionByIdUseCase(sessionRepository);
	return getSessionByIdUseCase.execute(id);
};

export const SessionQuery = (id: SessionId) =>
	new Query(["session", id], () => getSession(id));
