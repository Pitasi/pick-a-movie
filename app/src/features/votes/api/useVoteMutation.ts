import { MovieId, Session, Vote, VoteRestRepository } from "@/core";
import { useMutation, useQueryClient } from "react-query";

export interface UseVoteMutationParams {
	session: Session;
	movieId: MovieId;
}

export const useVoteMutation = () => {
	const queryClient = useQueryClient();
	const votesRepository = new VoteRestRepository();

	const onMutate = ({ session, movieId }: UseVoteMutationParams) => {
		const optimisticVote = {
			sessionId: session.id,
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
		async ({ session, movieId }: UseVoteMutationParams): Promise<Vote> => {
			return await votesRepository.save({
				session,
				movieId,
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
