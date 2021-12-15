import { Session, SessionId } from "../session";
import { SessionRepository } from "../SessionRepository";

export class GetSessionByIdUseCase {
	constructor(private readonly sessionRepository: SessionRepository) {
		this.sessionRepository = sessionRepository;
	}

	async execute(id: SessionId): Promise<Session | undefined> {
		return this.sessionRepository.get(id);
	}
}
