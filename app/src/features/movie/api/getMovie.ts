import {
	GetMovieByIdUseCase,
	Movie,
	MovieId,
	MovieInMemoryRepository,
} from "@/core";
import { Query } from "@/lib/api/query";

export const getMovie = (id: MovieId): Promise<Movie | undefined> => {
	const movieRepository = new MovieInMemoryRepository();
	const getMovieByIdUseCase = new GetMovieByIdUseCase(movieRepository);
	return getMovieByIdUseCase.execute(id);
};

export const MovieQuery = (id: MovieId) =>
	new Query(["movie", id], () => getMovie(id));
