import { GetSessionByIdUseCase, Session, SessionInMemoryRepository } from '@pick-a-movie/core';
import { AsyncData } from 'nuxt3/dist/app/composables/asyncData';

export function useSession(sessionId: string): AsyncData<Session> {
	const sessionRepository = new SessionInMemoryRepository();
	const getSessionByIdUseCase = new GetSessionByIdUseCase(sessionRepository);

	const key = "session-"+sessionId;
    return useAsyncData(key, () => getSessionByIdUseCase.execute(sessionId), {
		defer: true
	});
}
