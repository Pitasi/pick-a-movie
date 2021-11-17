import { getPlaiceholder } from "plaiceholder";
import { QueryClient } from "react-query";

export const prefetchBlurImage = (q: QueryClient, url: string) => {
	return q.prefetchQuery({
		queryKey: ["img", url],
		queryFn: async () => {
			const { base64 } = await getPlaiceholder(url);
			return base64;
		},
	});
};
