import axios from "axios";

const backendURL =
	process.env.BACKEND_URL || "https://pick-a-movie-api.anto.pt";

const tmdbURL = process.env.TMDB_URL || "https://api.themoviedb.org/3";

const tmdbTOKEN = process.env.TMDB_TOKEN;

export type SessionId = string;

export type Movie = TmdbMovie; // TODO: these two types may differ when we support other providers than TMDB

export interface Session {
	id: SessionId;
	title: string;
	proposals: Proposal[];
}

export type ProposalId = string;

export interface Proposal {
	id: ProposalId;
	movie: Movie | null;
	comment?: string;
	votes: Vote[];
}

export interface Vote {
	voterId: string;
}

export interface ApiProposal {
	id: number;
	movieId: string;
	comment: string;
	votes?: ApiVote[];
}

export interface ApiVote {
	voterId: string;
}

export interface ApiSession {
	createdAt: string;
	endAt: string;
	id: number;
	proposals: ApiProposal[];
	startAt: string;
	title: string;
	updatedAt: string;
}

export async function getSession(id: SessionId): Promise<Session | undefined> {
	const res = await axios.get<ApiSession>(`${backendURL}/v1/sessions/${id}`, {
		validateStatus: () => true,
	});
	if (res.status !== 200) {
		return undefined;
	}

	const apiSession = res.data;

	const resolvedProposals = await Promise.all(
		apiSession.proposals.map(async (p) => ({
			id: p.id.toString(),
			comment: p.comment,
			movie: await getMovie(p.movieId),
			votes:
				p.votes?.map((v) => ({
					voterId: v.voterId,
				})) || [],
		}))
	);

	return {
		id: apiSession.id.toString(),
		title: apiSession.title,
		proposals: resolvedProposals,
	};
}

export type MovieId = string;

export interface SessionMovie {
	sessionId: SessionId;
	movieId: MovieId;
}

export interface TmdbMovie {
	id: number;
	title: string;
	original_title: string;
	poster_path?: string;
	imdb_id: string;
	overview?: string;
	release_date?: string;
}

async function getMovie(id: MovieId): Promise<TmdbMovie | null> {
	const res = await axios.get<TmdbMovie>(`${tmdbURL}/movie/${id}`, {
		headers: {
			Authorization: `Bearer ${tmdbTOKEN}`,
		},
		validateStatus: () => true,
	});
	if (res.status === 404) {
		return null;
	}
	return res.data;
}

interface TmdbSearchResults {
	results: TmdbMovie[];
}

export async function search(query: string): Promise<TmdbMovie[]> {
	const res = await axios.get<TmdbSearchResults>(
		`${tmdbURL}/search/movie?query=${query}`,
		{
			headers: {
				Authorization: `Bearer ${tmdbTOKEN}`,
			},
			validateStatus: () => true,
		}
	);
	return res.data.results;
}

export async function addMovieToSession(
	sessionId: SessionId,
	movieId: MovieId
) {
	await axios.post(`${backendURL}/v1/proposals`, {
		sessionId: parseInt(sessionId, 10),
		movieId: parseInt(movieId, 10),
		comment: "",
	});
}

export async function newSession(
	title: string,
	startAt: Date,
	endAt: Date
): Promise<Session> {
	const res = await axios.post<Session>(`${backendURL}/v1/sessions`, {
		title,
		startAt,
		endAt,
	});
	return res.data;
}

export async function addVote(proposalId: ProposalId, userId: string) {
	await axios.post<Vote>(`${backendURL}/v1/votes`, {
		id: parseInt(proposalId, 10),
		voterId: userId,
	});
}
