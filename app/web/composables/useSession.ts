import { dependenciesLocator } from '@pick-a-movie/core';
import { usePloc } from './usePloc';


export function useSession(sessionId: string) {
	const sessionPloc = dependenciesLocator.provideSessionPloc();
	const ref = usePloc(sessionPloc);
	sessionPloc.load(sessionId);
	return ref;
}
