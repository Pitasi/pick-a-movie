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
import MovieSearchbar from "~/components/MovieSearchbar/MovieSearchbar";

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

	return (
		<section className="flex flex-col gap-12 px-8 py-16">
			<div>
				<h1 className="text-4xl font-light">
					{session.title || UNTITLED_SESSION}
				</h1>
				<p className="text-sm font-bold">({session.proposals.length} movies)</p>
			</div>

			<MovieSearchbar sessionId={session.id} />

			<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
				{session.proposals.map((p) => (
					<MovieCard proposal={p} key={p.id} sessionId={session.id} />
				))}
			</section>
		</section>
	);
};
