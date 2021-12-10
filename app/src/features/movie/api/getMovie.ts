import { GetMovieByIdUseCase, Movie, MovieId } from "@/core";
import { TmdbMovieRepository } from "@/core/movie/data/TmdbMovieRepository";
import { Query } from "@/lib/api/query";

export const getMovie = (id: MovieId): Promise<Movie | undefined> => {
	const movieRepository = new TmdbMovieRepository();
	const getMovieByIdUseCase = new GetMovieByIdUseCase(movieRepository);
	return getMovieByIdUseCase.execute(id);
};

export const MovieQuery = (id: MovieId) =>
	new Query(["movie", id], () => getMovie(id));
