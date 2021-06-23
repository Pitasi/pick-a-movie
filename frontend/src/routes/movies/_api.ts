export interface SearchResult {
    results: Movie[];
}

export interface Movie {
    id: number;
    title: string;
    poster_path?: string;
}

export const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function search(query: string): Promise<SearchResult> {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    });
    const data = await res.json();
    return data;
}

export interface MovieDetails {
    adult: boolean;
    backdrop_path: string;
    budget: number;
    genres: MovieGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export interface MovieGenre {
    id: number;
    name: string;
}

export async function details(movieId: string): Promise<MovieDetails> {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    });
    const data = await res.json();
    return data;
}