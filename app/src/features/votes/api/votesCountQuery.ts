import { MovieId } from "@/core";
import { Query } from "@/lib/api/query";

export const VotesCountQuery = (movieId: MovieId) =>
	new Query(`votescount-${movieId}`, async () => 123);
