import { Movie } from "../../../movie";
import { Session } from "../session";
import { SessionMovie } from "../SessionMovie";
import { SessionRepository } from "../SessionRepository";

export class AddMovieToSessionUseCase {
	readonly sessionRepository: SessionRepository;

	constructor(sessionRepository: SessionRepository) {
		this.sessionRepository = sessionRepository;
	}

	async execute(session: Session, movie: Movie): Promise<void> {
		const newSession = session.addMovie(new SessionMovie(movie));
		await this.sessionRepository.save(newSession);
	}
}