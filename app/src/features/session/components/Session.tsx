import { Movie } from "@/core";
import { useSession } from "../";
import { useAddMovieMutation } from "../api/useAddMovieMutation";
import MovieCards from "./MovieCard";
import Searchbar from "./Searchbar";

export interface SessionProps {
	id: string;
}

export const Session = ({ id }: SessionProps) => {
	const s = useSession(id);
	const addMovie = useAddMovieMutation();

	if (!s.data) {
		return <div>Loading session {id}...</div>;
	}

	const handleMovieSelected = (movie: Movie) => {
		addMovie.mutate({
			session: s.data,
			movie,
		});
	};

	return (
		<main>
			<Searchbar onMovieSelected={handleMovieSelected} />
			<h1>{s.data.title}</h1>
			<MovieCards movies={s.data.movies} />
		</main>
	);
};
