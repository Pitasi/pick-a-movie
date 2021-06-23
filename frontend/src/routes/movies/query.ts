import { search, SearchResult } from './_api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<SearchResult> = async (request) => {
	const response = await search(request.query.get('q'));
	return {
        status: 200,
        body: JSON.stringify(response),
        headers: {
            'content-type': 'application/json'
        },
    };
};