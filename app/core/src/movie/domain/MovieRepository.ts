import { Movie } from "./Movie";

export interface MovieRepository {
	get(filter: string): Promise<Movie[]>;
}
