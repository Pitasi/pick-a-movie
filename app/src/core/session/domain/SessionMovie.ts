import { Movie, MovieId } from "../../movie";

type ProposalId = string;

export class SessionMovie {
	movieId: MovieId;
	proposalId: ProposalId;

	constructor(movie: Movie, proposalId: ProposalId) {
		this.movieId = movie.id;
		this.proposalId = proposalId;
	}
}
