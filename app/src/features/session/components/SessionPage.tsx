import React from "react";
import { getSession, prefetchSession, Session } from "@/features/session";
import { dehydrate, QueryClient } from "react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import { prefetchMovie } from "@/features/movie/api/getMovie";

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

  // prefetch session object
  const queryClient = new QueryClient();
  await prefetchSession(queryClient, id);

  // prefetch all movies in session
  const session = await getSession(id);
  for (const movie of session.movies) {
    await prefetchMovie(queryClient, movie.movieId);
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
