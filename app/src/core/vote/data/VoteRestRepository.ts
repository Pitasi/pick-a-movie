import { MovieId, Session } from "@/core";
import { baseURL } from "@/core/config";
import { ApiSession } from "@/core/session/data/SessionRestRepository";
import { SessionMovie } from "@/core/session/domain/SessionMovie";
import { Vote, VoteRepository, VoteSaveRequest } from "../domain";

export interface ApiVote {
	id: number;
	proposalId: number;
	createdAt: string;
	updatedAt: string;
}

export interface ApiProposal {
	comment: string;
	createdAt: string;
	id: number;
	movieId: number;
	session: ApiSession;
	sessionId: number;
	updatedAt: string;
	votes?: ApiVote[];
}

export class VoteRestRepository implements VoteRepository {
	async getBySessionMovie(session: Session, movieId: MovieId): Promise<Vote[]> {
		const sessionMovie = this.findSessionMovie(session, movieId);
		const res = await fetch(
			`${baseURL}/v1/proposals/${sessionMovie.proposalId}`
		);
		const proposal: ApiProposal = await res.json();
		return (
			proposal.votes?.map((apiVote) => this.adapt(session, movieId, apiVote)) ||
			[]
		);
	}

	async save(req: VoteSaveRequest): Promise<Vote> {
		const sessionMovie = this.findSessionMovie(req.session, req.movieId);

		const res = await fetch(`${baseURL}/v1/votes`, {
			method: "POST",
			body: JSON.stringify({
				id: parseInt(sessionMovie.proposalId, 10),
			}),
		});

		const apiVote = await res.json();
		return this.adapt(req.session, req.movieId, apiVote);
	}

	private adapt(session: Session, movieId: MovieId, apiVote: ApiVote): Vote {
		return new Vote(session.id, movieId, "me", new Date(apiVote.updatedAt));
	}

	private findSessionMovie(session: Session, movieId: MovieId): SessionMovie {
		const sessionMovie = session.movies.find((sm) => sm.movieId === movieId);
		if (!sessionMovie) {
			throw new Error(`Movie ${movieId} not found in session ${session.id}`);
		}
		return sessionMovie;
	}
}
