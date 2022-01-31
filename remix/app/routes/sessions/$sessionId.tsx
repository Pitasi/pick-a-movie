import { useState } from "react";
import {
	ActionFunction,
	Form,
	LoaderFunction,
	MetaFunction,
	PrefetchPageLinks,
	useLoaderData,
} from "remix";
import {
	addMovieToSession,
	getSession,
	Session,
} from "~/utils/clients/backend";
import MovieCard from "~/components/MovieCard/MovieCard";

const UNTITLED_SESSION = "Untitled Session";

export const meta: MetaFunction = ({ data }) => {
	return { title: `${data.session?.title} - Pick a movie` };
};

interface LoaderData {
	session: Session;
}

export const loader: LoaderFunction = async ({
	params,
}): Promise<LoaderData> => {
	if (!params.sessionId) {
		throw new Error("sessionId is required");
	}

	const session = await getSession(params.sessionId);
	if (!session) {
		throw new Error("session not found");
	}

	return {
		session,
	};
};

export const action: ActionFunction = async ({
	params,
	request,
}): Promise<null> => {
	const sessionId = params.sessionId;
	const form = await request.formData();
	const movieId = form.get("movieId");

	if (!sessionId || !movieId || typeof movieId !== "string") {
		throw new Error("sessionId and movieId are required");
	}

	await addMovieToSession(sessionId, movieId);
	return null;
};

export default () => {
	const { session } = useLoaderData<LoaderData>();
	const [prefetchLink, setPrefetchLink] = useState<string>();

	return (
		<section>
			<h1>
				{session.title || UNTITLED_SESSION} ({session.proposals.length} movies)
			</h1>

			<Form method="get" action="/search">
				<input type="hidden" name="sessionId" value={session.id} />
				<input
					type="search"
					name="q"
					placeholder="Search for a movie"
					onChange={(e) =>
						setPrefetchLink(
							`/search?sessionId=${session.id}&q=${e.target.value}`
						)
					}
				/>
				<button type="submit">Search</button>
				{prefetchLink && <PrefetchPageLinks page={prefetchLink} />}
			</Form>

			<main className="w-full max-w-xs">
				{session.proposals.map((p) => (
					<MovieCard proposal={p} key={p.id} sessionId={session.id} />
				))}
			</main>
		</section>
	);
};
