import { Movie, Session } from "@/core";
import { SessionMovie } from "@/core/session/domain/SessionMovie";
import { useMutation, useQueryClient } from "react-query";

export interface AddMovieMutationParams {
	session: Session;
	movie: Movie;
}

export const useAddMovieMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		async ({ session, movie }: AddMovieMutationParams) => {
			const updatedSession = session.addMovie(new SessionMovie(movie));
			// TODO: persist new session
			return updatedSession;
		},
		{
			// Notice the second argument is the variables object that the `mutate` function receives
			onSuccess: (data, variables) => {
				queryClient.setQueryData(["session", variables.session.id], data);
			},
		}
	);
};
