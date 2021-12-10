import {
	AddMovieToSessionUseCase,
	Movie,
	Session,
	SessionInMemoryRepository,
} from "@/core";
import { SessionMovie } from "@/core/session/domain/SessionMovie";
import { useMutation, useQueryClient } from "react-query";

export interface AddMovieMutationParams {
	session: Session;
	movie: Movie;
}

export const useAddMovieMutation = () => {
	const queryClient = useQueryClient();
	const sessionRepository = new SessionInMemoryRepository();
	const addMovieToSessionUseCase = new AddMovieToSessionUseCase(
		sessionRepository
	);

	const onMutate = ({ session, movie }: AddMovieMutationParams) => {
		const optimisticSession = new Session(session.id, session.title, [
			...session.movies,
			new SessionMovie(movie),
		]);
		queryClient.setQueryData<Session>(
			["session", session.id],
			optimisticSession
		);

		return { originalSession: session, optimisticSession };
	};

	return useMutation(
		({ session, movie }: AddMovieMutationParams) =>
			addMovieToSessionUseCase.execute(session, movie),
		{
			onMutate,
			// Notice the second argument is the variables object that the `mutate` function receives
			onSuccess: (result, variables) => {
				queryClient.setQueryData(["session", variables.session.id], result);
			},
			onError: (error, variables, context) => {
				console.error("couldn't add movie to session", error);
				if (context) {
					queryClient.setQueryData(
						["session", variables.session.id],
						context.originalSession
					);
				}
			},
		}
	);
};
