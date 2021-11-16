import {
	GetSessionByIdUseCase,
	Session,
	SessionId,
	SessionInMemoryRepository,
} from "@/core";
import { Query } from "@/lib/api/query";

export const getSession = (id: SessionId): Promise<Session> => {
	const sessionRepository = new SessionInMemoryRepository();
	const getSessionByIdUseCase = new GetSessionByIdUseCase(sessionRepository);
	return getSessionByIdUseCase.execute(id);
};

export const SessionQuery = (id: SessionId) =>
	new Query(["session", id], () => getSession(id));
