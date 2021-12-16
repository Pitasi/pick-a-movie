import React, { FC } from "react";
import { SessionQuery, Session } from "@/features/session";
import { dehydrate, QueryClient } from "react-query";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { MovieQuery } from "@/features/movie/api/getMovie";

interface SessionPageProps {
	id: string;
}

const SessionPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
	id,
}) => <Session id={id} />;

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		fallback: true,
		paths: [],
	};
};

export const getStaticProps: GetStaticProps<SessionPageProps> = async (ctx) => {
	const id = ctx.params?.id as string;
	console.log("id", id, ctx.params);

	const queryClient = new QueryClient();

	// prefetch session object
	const q = SessionQuery(id);
	const session = await q.prefetch(queryClient);

	// prefetch all movies in session
	if (session) {
		for (const sessionMovie of session.movies) {
			const movieQ = MovieQuery(sessionMovie.movieId);
			await movieQ.prefetch(queryClient);
		}
	}

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			id,
		},
		revalidate: 30,
	};
};

export default SessionPage;
