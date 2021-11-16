import { MovieCard } from "@/features/movie";
import React from "react";
import { useSession } from "..";

export interface SessionProps {
  id: string;
}

export const Session = ({ id }: SessionProps) => {
  const s = useSession(id);

  if (!s.data) {
    return <div>Loading session {id}...</div>;
  }

  return (
    <div>
      <h1>{s.data?.title}</h1>
      <div>
        {s.data.movies.map((movie) => (
          <MovieCard key={movie.movieId} movie={movie} />
        ))}
      </div>
    </div>
  );
};
