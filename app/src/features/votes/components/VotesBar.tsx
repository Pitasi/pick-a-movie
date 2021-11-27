import { MovieId } from "@/core";
import { useResult } from "@/lib/api/query";
import { FC } from "react";
import { VotesCountQuery } from "../api/votesCountQuery";

export interface VotesBarProps {
	movieId: MovieId;
}

export const VotesBar: FC<VotesBarProps> = ({ movieId }) => {
	const d = useResult(VotesCountQuery(movieId));

	if (!d.data) {
		return <p>Loading votes...</p>;
	}

	return (
		<div>
			<p>{d.data} votes</p>
			<button>Vote</button>
		</div>
	);
};
