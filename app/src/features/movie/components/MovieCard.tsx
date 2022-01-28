import Image from "next/image";
import { SessionMovie } from "@/core/session/domain/SessionMovie";
import { useResult } from "@/lib/api/query";
import { MovieQuery } from "../api/getMovie";
import React from "react";
import { VotesBar } from "@/features/votes";

const fallbackPath = "";

export interface MovieProps {
	movie: SessionMovie;
}

export const MovieCard = ({ movie }: MovieProps) => {
	const d = useResult(MovieQuery(movie.movieId));

	if (!d.data) {
		return <div>Loading movie {movie.movieId}...</div>;
	}

	// const blurDataUrl =
	// 	d.data.posterPath &&
	// 	queryClient.getQueryData<string>(["img", d.data.posterPath]);

	return (
		<article className="p-1 bg-gray-800">
			<Image
				src={d.data.posterPath || fallbackPath}
				alt={d.data.title}
				height={450}
				width={300}
				className="rounded-3xl"
				// placeholder={blurDataUrl ? "blur" : undefined}
				// blurDataURL={blurDataUrl}
			/>
			<div className="px-4 py-6">
				<h2 className="text-2xl">{d.data.title}</h2>
				<VotesBar movieId={d.data.id} />
			</div>
		</article>
	);
};

export default MovieCard;
