import { QueryClient, QueryKey, useQuery, UseQueryResult } from "react-query";

export class Query<QueryKeyT extends QueryKey, ResultT> {
	constructor(
		readonly queryKey: QueryKeyT,
		readonly queryFn: () => Promise<ResultT>
	) {}

	async prefetch(client: QueryClient): Promise<ResultT> {
		const result = await this.queryFn();

		await client.prefetchQuery({
			queryKey: this.queryKey,
			queryFn: async () => this.fixSerialization(result),
		});

		return result;
	}

	private fixSerialization(o: unknown) {
		return JSON.parse(JSON.stringify(o));
	}
}

export const useResult = <QueryKeyT extends QueryKey, ResultT>(
	q: Query<QueryKeyT, ResultT>
): UseQueryResult<ResultT> => {
	return useQuery({
		queryKey: q.queryKey,
		queryFn: q.queryFn,
		staleTime: 30000,
	});
};
