import type { RequestHandler } from "@sveltejs/kit";

interface Session {
	id: string;
}

export const get: RequestHandler = async (request) => {
	const backend = 'https://pick-a-movie-api.anto.pt/v1';
	const res = await fetch(`${backend}/sessions`, {
		method: 'post',
		body: JSON.stringify({
			startAt: '2021-01-01T00:00:00Z',
			endAt: '2024-01-01T00:00:00Z'
		}),
	});
	const session = await res.json() as Session;

	return {
		status: 307,
		headers: {
			location: request.path.replace('new', session.id),
		}
	}
};