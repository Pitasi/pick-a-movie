import { QueryClient, useQuery, UseQueryResult } from "react-query";

import {
	GetSessionByIdUseCase,
	Session,
	SessionId,
	SessionInMemoryRepository,
} from "@/core";

export const getSession = (id: SessionId): Promise<Session> => {
	const sessionRepository = new SessionInMemoryRepository();
	const getSessionByIdUseCase = new GetSessionByIdUseCase(sessionRepository);
	return getSessionByIdUseCase.execute(id);
};

export const useSession = (id: SessionId): UseQueryResult<Session, unknown> => {
	return useQuery({
		queryKey: ["session", id],
		queryFn: () => getSession(id),
		staleTime: 30000,
	});
};

export const prefetchSession = (
	client: QueryClient,
	id: SessionId
): Promise<void> => {
	return client.prefetchQuery(["session", id], async () => ({
		...(await getSession(id)),
	}));
};
