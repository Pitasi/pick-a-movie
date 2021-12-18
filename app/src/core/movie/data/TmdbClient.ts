import { MovieId } from "..";

export interface TmdbMovie {
	id: number;
	title: string;
	original_title: string;
	poster_path?: string;
	imdb_id: string;
}

export class TmdbClient {
	private apiURL: string;

	constructor() {
		const e = process.env.NEXT_PUBLIC_TMDB_API_URL;
		if (!e) {
			throw new Error("Missing NEXT_PUBLIC_TMDB_API_URL env variable");
		}
		this.apiURL = e.replace(/\/$/g, "");
	}

	public async getMovie(id: MovieId): Promise<TmdbMovie | null> {
		const res = await fetch(`${this.apiURL}/movie/${id}`);
		if (res.status === 404) {
			return null;
		}
		return await res.json();
	}

	public async search(query: string): Promise<TmdbMovie[]> {
		const res = await fetch(`${this.apiURL}/search/movie?query=${query}`);
		const page = await res.json();
		return page.results;
	}
}
