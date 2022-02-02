import { Form, Link, LoaderFunction, useLoaderData } from "remix";
import Header from "~/components/Header/Header";
import { getUser, getUserId, User } from "~/utils/session.server";

interface LoaderData {
	user: User | undefined;
}

export const loader: LoaderFunction = async ({
	request,
}): Promise<LoaderData> => {
	const userId = await getUserId(request);
	return {
		user: userId ? await getUser(userId) : undefined,
	};
};

export default function Index() {
	const { user } = useLoaderData<LoaderData>();

	return (
		<section>
			<Header user={user} />
			<main className="flex flex-col p-16 gap-6">
				<h2 className="text-3xl">Create a new poll</h2>
				<Form
					method="post"
					action="/new-session"
					className="flex flex-col gap-4"
				>
					<input
						type="text"
						name="title"
						placeholder="Title"
						className="p-4 text-black flex rounded-3xl w-full"
						required
					/>
					<details>
						<summary>Advanced options</summary>
						<div className="flex flex-col gap-4 p-4">
							<div>
								<label htmlFor="startAt">Voting starts at</label>
								<input
									className="text-black p-4 w-full rounded-3xl"
									type="datetime-local"
									name="startAt"
								/>
							</div>

							<div>
								<label htmlFor="startAt">Voting ends at</label>
								<input
									className="text-black p-4 w-full rounded-3xl"
									type="datetime-local"
									name="endAt"
								/>
							</div>
						</div>
					</details>
					<button
						type="submit"
						className="gap-4 rounded-3xl px-8 py-2 bg-pink-400"
					>
						Create
					</button>
				</Form>
			</main>
		</section>
	);
}
