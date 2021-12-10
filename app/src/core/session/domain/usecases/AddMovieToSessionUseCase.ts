import { Movie } from "../../../movie";
import { Session } from "../session";
import { SessionMovie } from "../SessionMovie";
import { SessionRepository } from "../SessionRepository";

export class AddMovieToSessionUseCase {
	readonly sessionRepository: SessionRepository;

	constructor(sessionRepository: SessionRepository) {
		this.sessionRepository = sessionRepository;
	}

	async execute(session: Session, movie: Movie): Promise<Session> {
		const newSession = new Session(session.id, session.title, [
			...session.movies,
			new SessionMovie(movie),
		]);
		await this.sessionRepository.save(newSession);
		return newSession;
	}
}
