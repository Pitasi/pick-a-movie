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
		const sessionMovie = new SessionMovie(movie, "local");
		const newSession = new Session(session.id, session.title, [
			...session.movies,
			sessionMovie,
		]);
		await this.sessionRepository.addMovie(session, sessionMovie);
		return newSession;
	}
}
