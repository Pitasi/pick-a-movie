import { GetMovieByIdUseCase, Movie, MovieId, MovieInMemoryRepository } from "@/core";
import { QueryClient, useQuery, UseQueryResult } from "react-query";

export const getMovie = (id: MovieId): Promise<Movie | undefined> => {
  const movieRepository = new MovieInMemoryRepository();
  const getMovieByIdUseCase = new GetMovieByIdUseCase(movieRepository);
  return getMovieByIdUseCase.execute(id);
}

export const useMovie = (id: MovieId): UseQueryResult<Movie | undefined> => {
  return useQuery({
	  queryKey: ['movie', id],
	  queryFn: () => getMovie(id),
	  staleTime: 30000,
  });
}

export const prefetchMovie = (client: QueryClient, id: MovieId) => {
  return client.prefetchQuery({
	  queryKey: ['movie', id],
	  queryFn: () => getMovie(id),
  });
}