import { Movie, MovieId } from "./Movie";

export interface MovieRepository {
	getById(id: MovieId): Promise<Movie | undefined>;

	search(filter: string): Promise<Movie[]>;
}
