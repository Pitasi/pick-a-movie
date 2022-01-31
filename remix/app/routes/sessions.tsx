import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import { getUser, getUserId, User } from "~/utils/session.server";

interface LoaderData {
	currentPath: string;
	user?: User;
}

export const loader: LoaderFunction = async ({
	request,
}): Promise<LoaderData> => {
	const currentPath = new URL(request.url).pathname;
	const userId = await getUserId(request);

	if (userId) {
		return {
			user: await getUser(userId),
			currentPath,
		};
	}

	return {
		currentPath,
	};
};

export default () => {
	const { user, currentPath } = useLoaderData<LoaderData>();

	return (
		<section>
			<header className="flex flex-row w-full justify-between p-16">
				<section>
					<p className="text-3xl">🎬 Pick a movie</p>
				</section>

				<section className="text-xl">
					{user === undefined ? (
						<Link to={`/login?redirectTo=${encodeURIComponent(currentPath)}`}>
							Login
						</Link>
					) : (
						<p>{user.email}</p>
					)}
				</section>
			</header>
			<main>
				<Outlet />
			</main>
		</section>
	);
};
