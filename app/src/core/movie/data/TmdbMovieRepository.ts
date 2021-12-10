import { Movie, MovieId, MovieRepository } from "../domain";
import { TmdbClient, TmdbMovie } from "./TmdbClient";

export class TmdbMovieRepository implements MovieRepository {
	private client = new TmdbClient(process.env.TMDB_API_KEY || "");
	private poster_path_base = "https://image.tmdb.org/t/p/original";

	async getById(id: MovieId): Promise<Movie | undefined> {
		const tmdbMovie = await this.client.getMovie(id);
		return this.tmbMovieAdapter(tmdbMovie);
	}

	search(filter: string): Promise<Movie[]> {
		throw new Error("Method not implemented.");
	}

	tmbMovieAdapter(tmdbMovie: TmdbMovie | null): Movie | undefined {
		if (!tmdbMovie) {
			return undefined;
		}

		return {
			id: tmdbMovie.id.toString(),
			title: tmdbMovie.title,
			posterPath: `${this.poster_path_base}/${tmdbMovie.poster_path}`,
		};
	}
}
