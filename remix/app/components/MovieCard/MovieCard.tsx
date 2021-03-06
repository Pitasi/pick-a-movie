import { FC } from "react";
import { Form, Link, useMatches, useTransition } from "remix";
import { Proposal, SessionId } from "~/utils/clients/backend";
import { User } from "~/utils/session.server";

export interface MovieCardProps {
	proposal: Proposal;
	sessionId: SessionId;
}

const useUser = (): User | undefined => {
	const matches = useMatches();
	return matches.find((m) => m.id === "routes/sessions")?.data?.user;
};

const MovieCard: FC<MovieCardProps> = ({ proposal, sessionId }) => {
	const { submission } = useTransition();
	const user = useUser();

	const disableVoteButton = (p: Proposal) => {
		return (
			(submission && submission.formData.get("proposalId") === p.id) ||
			p.votes.some((v) => v.voterId === user?.id)
		);
	};

	const votesCount = (p: Proposal) => {
		if (submission && submission.formData.get("proposalId") === p.id) {
			return p.votes.length + 1;
		}
		return p.votes.length;
	};

	const releaseDate =
		proposal.movie?.release_date !== undefined
			? new Date(proposal.movie.release_date)
			: undefined;

	return (
		<article
			key={proposal.id}
			className="flex flex-col rounded-3xl bg-gray-800"
		>
			<div className="relative shadow-2xl rounded-3xl shadow-black">
				<img
					className="flex rounded-3xl"
					src={`https://image.tmdb.org/t/p/w500/${proposal.movie?.poster_path}`}
				/>
				{/* <img
					className="flex rounded-3xl absolute top-0 left-0"
					style={{ filter: "blur(5px) saturate(3)", transform: "scale(1.02)" }}
					src={`https://image.tmdb.org/t/p/w500/${proposal.movie?.poster_path}`}
				/> */}
			</div>

			<div className="flex flex-col px-6 relative -top-6 gap-8">
				<Form method="post" action="/add-vote" replace>
					<input
						type="hidden"
						name="redirectTo"
						value={`/sessions/${sessionId}`}
					/>
					<button
						disabled={disableVoteButton(proposal)}
						type="submit"
						value={proposal.id}
						name="proposalId"
						className="bg-white rounded-3xl px-4 py-2 text-md font-bold text-gray-800 backdrop-blur-md"
						style={{
							backgroundColor: disableVoteButton(proposal)
								? "white"
								: "rgba(255,255,255,0.45)",
						}}
					>
						<span
							style={{
								filter: disableVoteButton(proposal)
									? "saturate(1)"
									: "saturate(0.3)",
							}}
						>
							??????
						</span>
						&nbsp;&nbsp;
						{votesCount(proposal)}
					</button>
				</Form>
			</div>

			<div className="flex flex-col px-6 pb-6 relative gap-10 grow">
				<div className="flex flex-col gap-4">
					<div className="flex flex-row items-end justify-between">
						<h2 className="text-3xl">{proposal.movie?.title}</h2>
						<p className="text-gray-400 text-sm font-bold">
							{releaseDate?.getFullYear()}
						</p>
					</div>

					<div className="flex flex-row items-end text-sm text-gray-200 line-clamp-3">
						<p>{proposal.movie?.overview}</p>
					</div>
				</div>

				<div className="flex flex-row items-end gap-4 font-bold text-xs grow place-self-stretch">
					<Link to="#" className="uppercase">
						Trailer
					</Link>
					<Link to="#" className="uppercase">
						IMDB
					</Link>
				</div>
			</div>
		</article>
	);
};

export default MovieCard;
