import { ActionFunction, Form, useSearchParams } from "remix";
import { createUserSession } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }) => {
	const form = await request.formData();
	const email = form.get("email");
	if (typeof email !== "string" || email.length < 4) {
		throw new Error("invalid email");
	}

	const redirectTo = form.get("redirectTo");
	if (typeof redirectTo !== "string" || !redirectTo) {
		throw new Error("invalid redirectTo");
	}

	return await createUserSession(email, redirectTo);
};

export default () => {
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get("redirectTo") || "/";

	return (
		<div>
			<h1>Login</h1>
			<Form method="post">
				<input type="hidden" name="redirectTo" value={redirectTo} />
				<input type="email" name="email" placeholder="email@example.com" />
				<input type="password" name="password" placeholder="password" />
				<button type="submit">login</button>
			</Form>
		</div>
	);
};
