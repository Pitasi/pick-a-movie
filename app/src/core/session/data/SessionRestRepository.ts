import { baseURL } from "@/core/config";
import axios from "axios";
import { Session, SessionId } from "../domain/session";
import { SessionMovie } from "../domain/SessionMovie";
import { SessionRepository } from "../domain/SessionRepository";

export interface ApiProposal {
	id: string;
	movieId: string;
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
			apiSession.id.toString(),
			apiSession.title,
			apiSession.proposals.map((p) => ({
				proposalId: p.id.toString(),
				movieId: p.movieId.toString(),
			}))
		);
	}

	async addMovie(session: Session, sessionMovie: SessionMovie): Promise<void> {
		await axios.post(`${baseURL}/v1/proposals`, {
			sessionId: parseInt(session.id, 10),
			movieId: parseInt(sessionMovie.movieId, 10),
			comment: "",
		});
	}
}
