import React from "react";
import { SessionMovie } from "@/core/session/domain/SessionMovie";
import { MovieCard } from "@/features/movie";

export interface MovieCardsProps {
	movies: readonly SessionMovie[];
}

const MovieCards = ({ movies }: MovieCardsProps) =>
	movies && movies.length ? (
		<div>
			{movies.map((movie) => (
				<MovieCard key={movie.movieId} movie={movie} />
			))}
		</div>
	) : (
		<div>No movies</div>
	);

export default MovieCards;
