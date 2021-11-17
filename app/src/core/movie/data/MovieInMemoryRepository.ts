import { Movie, MovieId, MovieRepository } from "../domain";

export class MovieInMemoryRepository implements MovieRepository {
	getById(id: MovieId): Promise<Movie | undefined> {
		return Promise.resolve(movies.find((m) => m.id === id));
	}

	search(filter: string): Promise<Movie[]> {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (filter) {
					const filteredMovies = movies.filter((m) =>
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
		posterPath:
			"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fVqKwpvobwWy0P1UImZWIDuw4RI.jpg",
	},
	{
		id: "2",
		title: "Star Wars Episode 6",
		posterPath:
			"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/eX29Pj1dPifTOJ7oaeqzOx6ZkGm.jpg",
	},
	{
		id: "3",
		title: "The Godfather",
		posterPath:
			"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/r4gnMXoY1efvaolNDjn3nj4046S.jpg",
	},
	{
		id: "4",
		title: "Avalon",
		posterPath:
			"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/biRouXKtwRPIZ2meQvZMnUT6m2C.jpg",
	},
];
