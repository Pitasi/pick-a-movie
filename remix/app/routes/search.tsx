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
				<p>loading (an optimistic ui would show your movies here)...</p>
			</div>
		);
	}

	return (
		<section className="flex flex-col gap-16">
			<p className="text-sm font-bold">
				Add a new proposal to&nbsp;
				<Link
					prefetch="render"
					to={`/sessions/${session.id}`}
					className="underline"
				>
					{session.title}
				</Link>
			</p>

			<Form
				method="get"
				action="/search"
				className="flex flex-shrink-0 flex-row w-full rounded-3xl overflow-hidden"
			>
				<input type="hidden" name="sessionId" value={session.id} />
				<input
					className="flex grow p-4 text-black"
					type="search"
					name="q"
					placeholder="Search for a movie"
					defaultValue={q}
				/>
				<button type="submit" className="p-4 bg-white text-black font-bold">
					Search
				</button>
			</Form>

			<Form method="post" action={`/sessions/${session.id}`}>
				<input type="hidden" name="intent" value="add-movie" />
				<div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-8">
					{results.map((r) => (
						<div key={r.id}>
							<button
								disabled={isMoviePresent(r)}
								type="submit"
								name="movieId"
								value={r.id}
							>
								<div className="relative shadow-2xl rounded-3xl shadow-black">
									<img
										className="flex rounded-3xl"
										style={{ opacity: isMoviePresent(r) ? 0.2 : 1 }}
										src={`https://image.tmdb.org/t/p/w500/${r?.poster_path}`}
										alt={r.title}
									/>
								</div>
							</button>
						</div>
					))}
				</div>
			</Form>
		</section>
	);
};
