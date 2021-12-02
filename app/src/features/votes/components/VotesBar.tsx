import { MovieId, SessionId, Vote } from "@/core";
import { useSessionContext } from "@/features/session";
import { useResult } from "@/lib/api/query";
import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { VotesCountQuery } from "../api/votesCountQuery";

export interface VotesBarProps {
	movieId: MovieId;
}

export const VotesBar: FC<VotesBarProps> = ({ movieId }) => {
	const session = useSessionContext();
	const addVoteMutation = useVoteMutation();

	const d = useResult(VotesCountQuery(session.id, movieId));
	if (!d.data) {
		return <p>Loading votes...</p>;
	}

	const handleClick = async () => {
		await addVoteMutation.mutateAsync({
			sessionId: session.id,
			movieId,
		});
	};

	return (
		<div>
			<p>{d.data.length} votes</p>
			<button onClick={handleClick}>Vote</button>
		</div>
	);
};

export interface UseVoteMutationParams {
	sessionId: SessionId;
	movieId: MovieId;
}

export const useVoteMutation = () => {
	const queryClient = useQueryClient();

	const onMutate = ({ sessionId, movieId }: UseVoteMutationParams) => {
		const optimisticVote = {
			sessionId,
			movieId,
			author: "me",
			date: new Date(),
		};
		queryClient.setQueryData<Vote[]>(`votescount-${movieId}`, (old) => [
			...(old || []),
			optimisticVote,
		]);
		return { optimisticVote };
	};

	return useMutation(
		async ({ sessionId, movieId }: UseVoteMutationParams): Promise<Vote> => {
			// TODO: persist vote and return it for real
			return new Promise((resolve) => {
				setTimeout(
					() =>
						resolve({
							sessionId,
							movieId,
							author: "Antonio",
							date: new Date(),
						}),
					1000
				);
			});
		},
		{
			onMutate,
			onSuccess: (result, variables, context) => {
				// Replace optimistic vote in the list with the result
				console.log("success");
				queryClient.setQueryData<Vote[]>(
					`votescount-${variables.movieId}`,
					(old) =>
						old
							? old.map((vote) =>
									vote.author === context?.optimisticVote.author ? result : vote
							  )
							: []
				);
			},
			onError: (error, variables, context) => {
				// Remove optimistic vote from the list
				queryClient.setQueryData<Vote[]>(
					`votescount-${variables.movieId}`,
					(old) =>
						old
							? old.filter(
									(vote) => vote.author !== context?.optimisticVote.author
							  )
							: []
				);
			},
		}
	);
};
