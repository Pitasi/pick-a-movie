import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import Header from "~/components/Header/Header";
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
			<Header user={user} redirectTo={currentPath} />
			<main>
				<Outlet />
			</main>
		</section>
	);
};
