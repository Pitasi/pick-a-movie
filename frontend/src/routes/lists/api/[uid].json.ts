import type { RequestHandler } from '@sveltejs/kit';

export interface List {
    title: string;
    items: ListItem[];
}

export interface ListItem {
    movieId: string;
    votes: number;
}

const db: { [key: string]: List } = {
    1: {
        title: 'a list',
        items: [
            { movieId: "337404", votes: 1 },
            { movieId: "423108", votes: 2 },
            { movieId: "238", votes: 1 },
            { movieId: "372058", votes: 1 },
            { movieId: "496243", votes: 1 },
        ],
    },
    2: {
        title: 'a nice list',
        items: [],
    },
}

export const get: RequestHandler<List> = async (request) => {
    const uid = request.params['uid'];
    if (!db[uid]) {
        return {
            status: 404,
            body: { 'error': 'not found' },
        };
    }

	return {
        status: 200,
        body: JSON.stringify(db[uid]),
        headers: {
            'content-type': 'application/json'
        },
    };
};

interface AddMovieRequest {
    movieId: string;
}

export const put: RequestHandler<Record<string, any>, AddMovieRequest> = async (request) => {
    const uid = request.params['uid'];
    if (!db[uid]) {
        return {
            status: 404,
            body: { 'error': 'not found' },
        };
    }

    const movieId = request.body.movieId;

    if (db[uid].items.some(i => i.movieId == movieId)) {
        return {
            status: 409,
        }
    }

    db[uid].items.push({
        movieId,
        votes: 1,
    });

    return {
        status: 204,
    }
}