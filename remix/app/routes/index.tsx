import { Form, Link, LoaderFunction, useLoaderData } from "remix";
import { getUser, getUserId, User } from "~/utils/session.server";

interface LoaderData {
	user: User | null;
}

export const loader: LoaderFunction = async ({
	request,
}): Promise<LoaderData> => {
	const userId = await getUserId(request);
	return {
		user: userId ? await getUser(userId) : null,
	};
};

export default function Index() {
	const { user } = useLoaderData<LoaderData>();

	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1 className="text-pink-500 font-bold text-3xl">
				Welcome to pick a movie
			</h1>
			{user === null ? (
				<Link to="/login">Login</Link>
			) : (
				<p>Welcome back {user.email}. Logout is not implemented yet.</p>
			)}
			<Form method="post" action="/new-session">
				<h2>Create a new poll</h2>
				<input type="text" name="title" placeholder="Title" />
				<details>
					<summary>Other options</summary>
					<input type="datetime-local" name="startAt" />
					<input type="datetime-local" name="endAt" />
				</details>
				<button type="submit">Create</button>
			</Form>
		</div>
	);
}
