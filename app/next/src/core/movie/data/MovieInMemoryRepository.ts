import { Movie, MovieId, MovieRepository } from "../domain";

export class MovieInMemoryRepository implements MovieRepository {
	getById(id: MovieId): Promise<Movie | undefined> {
		return Promise.resolve(movies.find(m => m.id === id));
	}

	search(filter: string): Promise<Movie[]> {
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

const movies: Movie[] = [
	{
		id: "1",
		title: "Star Wars Episode 1",
		posterPath: undefined,
	},
	{
		id: "2",
		title: "Star Wars Episode 6",
		posterPath: undefined,
	},
	{
		id: "3",
		title: "The Godfather",
		posterPath: undefined,
	},
	{
		id: "4",
		title: "Avalon",
		posterPath: undefined,
	},
];
