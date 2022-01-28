import { ActionFunction, Outlet, redirect } from "remix";
import { newSession } from "~/utils/clients/backend";

function validateTitle(title: FormDataEntryValue | null): string {
	if (!title || typeof title !== "string") {
		throw new Error("invalid title");
	}
	return title;
}

function validateDate(dateStr: FormDataEntryValue | null): Date | null {
	if (!dateStr || typeof dateStr !== "string") {
		return null;
	}

	const date = new Date(dateStr);
	return date;
}

function validateStartAt(startAt: FormDataEntryValue | null): Date {
	const DEFAULT_START_AT = new Date("2020-01-01");
	return validateDate(startAt) || DEFAULT_START_AT;
}

function validateEndAt(endAt: FormDataEntryValue | null): Date {
	const DEFAULT_END_AT = new Date("2050-01-01");
	return validateDate(endAt) || DEFAULT_END_AT;
}

export const action: ActionFunction = async ({
	request,
}): Promise<Response> => {
	const form = await request.formData();
	const title = validateTitle(form.get("title"));
	const startAt = validateStartAt(form.get("startAt"));
	const endAt = validateEndAt(form.get("endAt"));

	const session = await newSession(title, startAt, endAt);

	return redirect(`/sessions/${session.id}`);
};

export default () => <Outlet />;
