import { Movie } from "@/core";
import { useAddMovieMutation } from "../api/useAddMovieMutation";
import MovieCards from "./MovieCard";
import Searchbar from "./Searchbar";
import { useResult } from "@/lib/api/query";
import React from "react";
import { SessionQuery } from "..";
import { SessionContext } from "./SessionContext";

export interface SessionProps {
	id: string;
}

export const Session = ({ id }: SessionProps) => {
	const addMovie = useAddMovieMutation();
	const s = useResult(SessionQuery(id));

	if (!s.data) {
		return <div>Loading session {id}...</div>;
	}

	const handleMovieSelected = (movie: Movie) => {
		addMovie.mutate({
			session: s.data,
			movie,
		});
	};

	const excludeFilter = (movie: Movie) => {
		return s.data.movies.some((m) => m.movieId === movie.id);
	};

	return (
		<main>
			<SessionContext.Provider value={s.data}>
				<Searchbar
					excludeFilter={excludeFilter}
					onMovieSelected={handleMovieSelected}
				/>
				<h1>{s.data.title}</h1>
				<MovieCards movies={s.data.movies} />
			</SessionContext.Provider>
		</main>
	);
};
