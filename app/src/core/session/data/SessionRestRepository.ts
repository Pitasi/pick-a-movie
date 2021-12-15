import axios from "axios";
import { Session, SessionId } from "../domain/session";
import { SessionMovie } from "../domain/SessionMovie";
import { SessionRepository } from "../domain/SessionRepository";

const baseURL = process.env.BACKEND_URL || "https://pick-a-movie-api.anto.pt";

export interface ApiProposal {
	id: string;
	movieId: string;
}

export interface ApiSession {
	createdAt: string;
	endAt: string;
	id: string;
	proposals: ApiProposal[];
	startAt: string;
	title: string;
	updatedAt: string;
}

export class SessionRestRepository implements SessionRepository {
	async get(id: SessionId): Promise<Session | undefined> {
		const res = await axios.get<ApiSession>(`${baseURL}/v1/sessions/${id}`, {
			validateStatus: (status) =>
				(status >= 200 && status < 300) || status === 404,
		});
		if (res.status === 404) {
			return undefined;
		}

		const apiSession = res.data;
		return new Session(
			apiSession.id,
			apiSession.title,
			apiSession.proposals.map((p) => ({ movieId: p.movieId }))
		);
	}

	async addMovie(session: Session, sessionMovie: SessionMovie): Promise<void> {
		await axios.post(`${baseURL}/v1/proposals`, {
			sessionId: session.id,
			movieId: parseInt(sessionMovie.movieId, 10),
			comment: "",
		});
	}
}