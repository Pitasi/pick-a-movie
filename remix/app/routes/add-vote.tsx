import { ActionFunction, Link, redirect, useParams } from "remix";
import { addVote } from "~/utils/clients/backend";
import { requireUserId } from "~/utils/session.server";

function validateString(
	proposalId: FormDataEntryValue | null,
	paramName: string
): string {
	if (typeof proposalId !== "string") {
		throw new Error(`invalid ${paramName} format`);
	}

	return proposalId;
}

export const action: ActionFunction = async ({
	request,
}): Promise<Response> => {
	const form = await request.formData();
	const proposalId = validateString(form.get("proposalId"), "proposalId");
	const redirectTo = validateString(form.get("redirectTo"), "redirectTo");

	const userId = await requireUserId(request, redirectTo);

	try {
		await addVote(proposalId, userId);
	} catch (e) {
		console.error("couldn't add your vote:", e);
		return redirect(redirectTo);
	}

	return redirect(redirectTo);
};

export default () => {
	const params = useParams();
	return (
		<Link prefetch="render" to={`/sessions/${params.sessionId}`}>
			Back to poll page
		</Link>
	);
};
