import type { RequestHandler } from '@sveltejs/kit';

export interface Session {
    createdAt: string,
    endAt:string,
    id: number,
    proposals: Proposal[],
    startAt: string,
    updatedAt: string,
}

export interface Proposal { 
    boh: number;
}

export const get: RequestHandler<Session> = async (request) => {
    const id = request.params['uid'];
    const backend = 'https://pick-a-movie-api.anto.pt/v1';
    const res = await fetch(`${backend}/sessions/${id}`);
    const data = await res.json();
	return {
        status: 200,
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
    };
};

interface AddMovieRequest {
    movieId: string;
}

export const put: RequestHandler<Record<string, any>, AddMovieRequest> = async (request) => {
    return {
        status: 204,
    }
}