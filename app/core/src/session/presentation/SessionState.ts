import { Session } from "../domain/session";

export interface CommonSessionState { }

export interface LoadingSessionState {
	kind: 'LoadingSessionState',
}

export interface LoadedSessionState {
	kind: 'LoadedSessionState',
	session: Session,
}

export type SessionState = (LoadingSessionState | LoadedSessionState) & CommonSessionState;

export const sessionInitialState: SessionState = {
	kind: 'LoadingSessionState',
};