import axios, { AxiosInstance } from "axios";
import { MovieId } from "..";

export interface TmdbMovie {
	id: number;
	title: string;
	original_title: string;
	poster_path?: string;
	imdb_id: string;
}

export class TmdbClient {
	private axios: AxiosInstance;

	constructor() {
		this.axios = axios.create({
			baseURL:
				(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}` ||
					"http://localhost:3000") + "/api/tmdb",
		});
	}

	public async getMovie(id: MovieId): Promise<TmdbMovie | null> {
		const res = await this.axios.get<TmdbMovie>(`movie/${id}`, {
			validateStatus: (status) =>
				status === 404 || (status >= 200 && status < 300),
		});
		if (res.status === 404) {
			return null;
		}
		return res.data;
	}

	public async search(query: string): Promise<TmdbMovie[]> {
		const res = await this.axios.get(`search/movie?query=${query}`);
		return res.data.results;
	}
}
