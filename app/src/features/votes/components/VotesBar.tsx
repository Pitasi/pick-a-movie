import { MovieId } from "@/core";
import { useSessionContext } from "@/features/session";
import { useResult } from "@/lib/api/query";
import { FC } from "react";
import { useVoteMutation } from "../api/useVoteMutation";
import { VotesCountQuery } from "../api/votesCountQuery";

export interface VotesBarProps {
	movieId: MovieId;
}

export const VotesBar: FC<VotesBarProps> = ({ movieId }) => {
	const session = useSessionContext();
	const addVoteMutation = useVoteMutation();

	const d = useResult(VotesCountQuery(session, movieId));

	if (!d.data) {
		return <p>Loading votes...</p>;
	}

	const voted = localStorage?.getItem(`vote-${session.id}-${movieId}`);
	const handleClick = async () => {
		if (!voted) {
			localStorage.setItem(`vote-${session.id}-${movieId}`, "true");
			await addVoteMutation.mutateAsync({
				session: session,
				movieId,
			});
		} else {
			// localStorage.removeItem(`vote-${movieId}`);
			// TODO
		}
	};

	return (
		<div>
			<p>{d.data.length} votes</p>
			<button disabled={!!voted} onClick={handleClick}>
				Vote
			</button>
		</div>
	);
};
