import { useState } from "react";
import {
	ActionFunction,
	Form,
	LoaderFunction,
	MetaFunction,
	PrefetchPageLinks,
	useLoaderData,
	useTransition,
} from "remix";
import {
	addMovieToSession,
	getSession,
	Proposal,
	Session,
} from "~/utils/clients/backend";

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

	console.log("adding new proposal");

	if (!sessionId || !movieId || typeof movieId !== "string") {
		throw new Error("sessionId and movieId are required");
	}

	await addMovieToSession(sessionId, movieId);
	console.log("done");
	return null;
};

export default () => {
	const { session } = useLoaderData<LoaderData>();
	const { submission } = useTransition();
	const [prefetchLink, setPrefetchLink] = useState<string>();

	const disableVoteButton = (p: Proposal) => {
		return submission && submission.formData.get("proposalId") === p.id;
	};

	const votesCount = (p: Proposal) => {
		if (submission && submission.formData.get("proposalId") === p.id) {
			return p.votes.length + 1;
		}
		return p.votes.length;
	};

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

			{session.proposals.map((p) => (
				<article key={p.id} className="border-2 border-blue-600">
					<p>{p.movie?.title}</p>
					<Form
						method="post"
						action="/add-vote"
						replace
						onSubmit={() => {
							localStorage.setItem(p.id, "true");
						}}
					>
						<input
							type="hidden"
							name="redirectTo"
							value={`/sessions/${session.id}`}
						/>
						<button
							disabled={disableVoteButton(p)}
							type="submit"
							value={p.id}
							name="proposalId"
							className="bg-pink-400"
						>
							Vote ({votesCount(p)})
						</button>
					</Form>
				</article>
			))}
		</section>
	);
};
