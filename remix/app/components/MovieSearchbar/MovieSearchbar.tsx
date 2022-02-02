import { FC, useState } from "react";
import { Form, PrefetchPageLinks } from "remix";
import { SessionId } from "~/utils/clients/backend";

export interface MovieSearchbarProps {
	sessionId: SessionId;
	defaultValue?: string;
}

const MovieSearchbar: FC<MovieSearchbarProps> = ({
	sessionId,
	defaultValue,
}) => {
	const [prefetchLink, setPrefetchLink] = useState<string>();

	return (
		<Form method="get" action="/search" className="flex flex-row w-full">
			<input type="hidden" name="sessionId" value={sessionId} />
			<input
				className="flex w-full p-4 text-black rounded-l-3xl"
				type="search"
				name="q"
				defaultValue={defaultValue}
				placeholder="Search for a movie"
				onChange={(e) =>
					setPrefetchLink(`/search?sessionId=${sessionId}&q=${e.target.value}`)
				}
			/>
			<button
				type="submit"
				className="flex flex-shrink-0 p-4 rounded-r-3xl bg-white text-black font-bold sm:hidden"
			>
				🔍
			</button>
			<button
				type="submit"
				className="flex-shrink-0 p-4 rounded-r-3xl bg-white text-black font-bold hidden sm:flex"
			>
				Search
			</button>
			{prefetchLink && <PrefetchPageLinks page={prefetchLink} />}
		</Form>
	);
};

export default MovieSearchbar;
