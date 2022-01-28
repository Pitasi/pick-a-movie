import {
	Form,
	json,
	Link,
	LoaderFunction,
	MetaFunction,
	useLoaderData,
	useTransition,
} from "remix";
import { getSession, Movie, search, Session } from "~/utils/clients/backend";

export const meta: MetaFunction = ({ data }) => {
	return { title: `"${data.q}" - ${data.session.title} - Pick a movie` };
};

interface LoaderData {
	results: Movie[];
	session: Session;
	q: string;
}

function badRequest(): Response {
	return json({ message: "bad request" }, 400);
}

function validateSessionId(sessionId: string | null): string {
	if (!sessionId) {
		throw badRequest();
	}

	return sessionId;
}

function validateQuery(q: string | null): string {
	if (!q) {
		throw badRequest();
	}

	return q;
}

export const loader: LoaderFunction = async ({
	request,
}): Promise<LoaderData> => {
	const url = new URL(request.url);
	const q = validateQuery(url.searchParams.get("q"));
	const sessionId = validateSessionId(url.searchParams.get("sessionId"));

	const results = await search(q);
	const session = await getSession(sessionId);
	if (!session) {
		throw badRequest();
	}

	return {
		results,
		session,
		q,
	};
};

export default () => {
	const loaderData = useLoaderData<LoaderData>();
	const { session, results, q } = loaderData;

	const alreadyAddedMovieIds = new Set(
		session.proposals.map((p) => p.movie?.id)
	);
	const isMoviePresent = (movie: Movie): boolean => {
		return alreadyAddedMovieIds.has(movie.id);
	};

	const { submission } = useTransition();
	if (submission) {
		return (
			<div>
				<p>{JSON.stringify(submission)}</p>
				<p>loading (an optimistic ui would show your movies here)...</p>
			</div>
		);
	}

	return (
		<section>
			<Link prefetch="render" to={`/sessions/${session.id}`}>
				Back to {session.title}
			</Link>

			<Form>
				<input type="hidden" name="sessionId" value={session.id} />
				<input
					type="search"
					name="q"
					placeholder="Search for a movie"
					defaultValue={q}
				/>
				<button type="submit">Search</button>
			</Form>

			<Form method="post" action={`/sessions/${session.id}`}>
				<input type="hidden" name="intent" value="add-movie" />
				{results.map((r) => (
					<div key={r.id}>
						<button
							disabled={isMoviePresent(r)}
							type="submit"
							name="movieId"
							value={r.id}
						>
							{r.title}
						</button>
					</div>
				))}
			</Form>
		</section>
	);
};
