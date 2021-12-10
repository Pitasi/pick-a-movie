import { MovieId, SessionId, Vote } from "@/core";
import { useMutation, useQueryClient } from "react-query";

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
				console.error("couldn't add vote", error);
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
