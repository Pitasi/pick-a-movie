import { Session, SessionId } from "../session";
import { SessionRepository } from "../SessionRepository";


export class GetSessionByIdUseCase {
	readonly sessionRepository: SessionRepository;

	constructor(sessionRepository: SessionRepository) {
		this.sessionRepository = sessionRepository;
	}

	async execute(id: SessionId): Promise<Session> {
		return this.sessionRepository.get(id);
	}
}
