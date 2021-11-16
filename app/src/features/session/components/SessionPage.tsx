import React from "react";
import { SessionQuery, Session } from "@/features/session";
import { dehydrate, QueryClient } from "react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import { MovieQuery } from "@/features/movie/api/getMovie";

interface SessionPageProps {
	id: string;
}

const SessionPage = ({ id }: SessionPageProps) => <Session id={id} />;

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		fallback: true,
		paths: [],
	};
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const id = ctx.params?.id as string;

	const queryClient = new QueryClient();

	// prefetch session object
	const q = SessionQuery(id);
	const session = await q.prefetch(queryClient);

	// prefetch all movies in session
	for (const movie of session.movies) {
		const movieQ = MovieQuery(movie.movieId);
		await movieQ.prefetch(queryClient);
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
