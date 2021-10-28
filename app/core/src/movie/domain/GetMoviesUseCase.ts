import { MovieRepository } from "./MovieRepository";
import { Movie } from "./Movie";

export class SearchMoviesUseCase {
	private movieRepository: MovieRepository;

	constructor(
		movieRepository: MovieRepository,
	) {
		this.movieRepository = movieRepository;
	}

	execute(filter: string): Promise<Movie[]> {
		return this.movieRepository.search(filter);
	}
}
