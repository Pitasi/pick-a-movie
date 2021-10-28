import { SearchMoviesUseCase, MovieInMemoryRepository, MoviesPloc } from "../../movie";
import { GetSessionByIdUseCase, SessionPloc, SessionInMemoryRepository } from "../../session";

function provideMoviesPloc(): MoviesPloc {
	const movieRepository = new MovieInMemoryRepository();
	const getMoviesUseCase = new SearchMoviesUseCase(movieRepository);
	const moviesPloc = new MoviesPloc(getMoviesUseCase);
	return moviesPloc;
}

function provideSessionPloc(): SessionPloc {
	const sessionRepository = new SessionInMemoryRepository();
	const getSessionByIdUseCase = new GetSessionByIdUseCase(sessionRepository);
	const sessionPloc = new SessionPloc(getSessionByIdUseCase);
	return sessionPloc;
}

export const dependenciesLocator = {
	provideMoviesPloc,
	provideSessionPloc,
};
