import { SessionMovie } from "@/core/session/domain/SessionMovie";
import { useMovie } from "../api/getMovie";

export interface MovieProps {
  movie: SessionMovie;
}

export const MovieCard = ({ movie }: MovieProps) => {
  const d = useMovie(movie.movieId);

  if (!d.data) {
    return <div>Loading movie {movie.movieId}...</div>;
  }

  return <p>{d.data.title}</p>;
};

export default MovieCard;
