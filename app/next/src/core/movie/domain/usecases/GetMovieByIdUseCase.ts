import { Movie, MovieId, MovieRepository } from "..";

export class GetMovieByIdUseCase {
	constructor(
		private readonly movieRepository: MovieRepository,
	) { }

	async execute(id: MovieId): Promise<Movie | undefined> {
		return await this.movieRepository.getById(id);
	}
}