import { Ploc } from "../../common";
import { SessionId } from "../domain/session";
import { GetSessionByIdUseCase } from "../domain/usecases";
import { sessionInitialState, SessionState } from "./SessionState";

export class SessionPloc extends Ploc<SessionState> {
	constructor(
		private readonly getSessionByIdUseCase: GetSessionByIdUseCase,
	) {
		super(sessionInitialState);
		this.getSessionByIdUseCase = getSessionByIdUseCase;
	}
	
	async load(id: SessionId): Promise<void> {
		const session = await this.getSessionByIdUseCase.execute(id);
		this.changeState({
			kind: 'LoadedSessionState',
			session,
		});
	}
}