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

	constructor(apiKey: string) {
		this.axios = axios.create({
			baseURL: "https://api.themoviedb.org/3/",
			headers: {
				authorization: `Bearer ${apiKey}`,
			},
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
}
