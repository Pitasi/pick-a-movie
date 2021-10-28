import { Movie, MovieId } from "./Movie";

export interface MovieRepository {
	getById(id: MovieId): Promise<Movie>;

	search(filter: string): Promise<Movie[]>;
}
