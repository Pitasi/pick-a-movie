import { Movie } from "@/core";
import { useSearchMovies } from "@/features/movie/api/searchMovies";
import React, { useState } from "react";
import Result from "./Result";

export interface SearchbarProps {
	onMovieSelected: (movie: Movie) => void;
}

const Searchbar = ({ onMovieSelected }: SearchbarProps) => {
	const [query, setQuery] = useState("");
	const resetQuery = () => setQuery("");

	const res = useSearchMovies(query);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			setQuery(e.target.value);
		} else {
			resetQuery();
		}
	};

	const handleMovieSelected = (m: Movie) => {
		resetQuery();
		onMovieSelected(m);
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Search..."
				value={query}
				onChange={handleChange}
			/>

			<div>
				{res &&
					res.data?.map((movie) => (
						<Result
							key={movie.id}
							title={movie.title}
							onClick={() => handleMovieSelected(movie)}
						/>
					))}
			</div>
		</div>
	);
};

export default Searchbar;
