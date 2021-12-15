import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const TMDB_TOKEN = process.env.TMDB_TOKEN;

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
	const u =
		"https://api.themoviedb.org/3/" + req.url?.replace("/api/tmdb/", "");
	const tmdbRes = await axios.get(u, {
		headers: {
			Authorization: `Bearer ${TMDB_TOKEN}`,
		},
		validateStatus: () => true,
	});
	res.status(tmdbRes.status).json(tmdbRes.data);
};

export default handle;
