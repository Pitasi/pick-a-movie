import { Movie } from "@/core";
import { useAddMovieMutation } from "../api/useAddMovieMutation";
import MovieCards from "./MovieCard";
import Searchbar from "./Searchbar";
import { useResult } from "@/lib/api/query";
import React from "react";
import { SessionQuery } from "..";

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

	return (
		<main>
			<Searchbar onMovieSelected={handleMovieSelected} />
			<h1>{s.data.title}</h1>
			<MovieCards movies={s.data.movies} />
		</main>
	);
};