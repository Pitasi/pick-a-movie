import { Movie, MovieId, MovieRepository } from "../domain";
import { TmdbClient, TmdbMovie } from "./TmdbClient";

export class TmdbMovieRepository implements MovieRepository {
	private client: TmdbClient;
	private poster_path_base = "https://image.tmdb.org/t/p/original";

	constructor() {
		this.client = new TmdbClient();
		return this;
	}

	async getById(id: MovieId): Promise<Movie | undefined> {
		const tmdbMovie = await this.client.getMovie(id);
		if (!tmdbMovie) {
			return undefined;
		}

		return this.tmbMovieAdapter(tmdbMovie);
	}

	async search(filter: string): Promise<Movie[]> {
		const movies = await this.client.search(filter);
		return movies.map((m) => this.tmbMovieAdapter(m));
	}

	tmbMovieAdapter(tmdbMovie: TmdbMovie): Movie {
		return {
			id: tmdbMovie.id.toString(),
			title: tmdbMovie.title,
			posterPath: `${this.poster_path_base}/${tmdbMovie.poster_path}`,
		};
	}
}
