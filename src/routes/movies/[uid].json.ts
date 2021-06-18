import { details, MovieDetails } from './_api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<MovieDetails> = async (request) => {
	const response = await details(request.params.uid);
	return {
        status: 200,
        body: JSON.stringify(response),
        headers: {
            'content-type': 'application/json'
        },
    };
};