import Image from "next/image";
import { SessionMovie } from "@/core/session/domain/SessionMovie";
import { useMovie } from "../api/getMovie";
import { useQueryClient } from "react-query";

const fallbackPath = "";

export interface MovieProps {
	movie: SessionMovie;
}

export const MovieCard = ({ movie }: MovieProps) => {
	const d = useMovie(movie.movieId);
	const queryClient = useQueryClient();

	if (!d.data) {
		return <div>Loading movie {movie.movieId}...</div>;
	}

	// const blurDataUrl =
	// 	d.data.posterPath &&
	// 	queryClient.getQueryData<string>(["img", d.data.posterPath]);

	return (
		<article>
			<p>{d.data.title}</p>
			<Image
				src={d.data?.posterPath || fallbackPath}
				alt={d.data.title}
				height={450}
				width={300}
				// placeholder={blurDataUrl ? "blur" : undefined}
				// blurDataURL={blurDataUrl}
			/>
		</article>
	);
};

export default MovieCard;
