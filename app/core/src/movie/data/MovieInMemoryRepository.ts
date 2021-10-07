import { Movie, MovieRepository } from "../domain";

export class MovieInMemoryRepository implements MovieRepository {
	get(filter: string): Promise<Movie[]> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (filter) {
					const filteredMovies = movies.filter(m =>
						 m.title.toLowerCase().includes(filter.toLowerCase())
					);
					resolve(filteredMovies);
				} else {
					resolve(movies);
				}
			}, 100);
		});
	}
}

const movies: Movie[] = [];
