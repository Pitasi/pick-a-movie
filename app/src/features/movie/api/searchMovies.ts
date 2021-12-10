import { Movie, SearchMoviesUseCase } from "@/core";
import { TmdbMovieRepository } from "@/core/movie/data/TmdbMovieRepository";
import { useQuery, UseQueryResult } from "react-query";

export const searchMovies = (term: string): Promise<Movie[]> => {
	const movieRepository = new TmdbMovieRepository();
	const searchMoviesUseCase = new SearchMoviesUseCase(movieRepository);
	return searchMoviesUseCase.execute(term);
};

export const useSearchMovies = (term: string): UseQueryResult<Movie[]> => {
	return useQuery({
		queryKey: ["search-movie", term],
		queryFn: () => {
			if (!term) {
				return [];
			}
			return searchMovies(term);
		},
		staleTime: 5000,
	});
};
