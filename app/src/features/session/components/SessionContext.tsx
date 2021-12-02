import { Session } from "@/core";
import { createContext, useContext } from "react";

export const SessionContext = createContext<Session | undefined>(undefined);

export const useSessionContext = (): Session => {
	const session = useContext(SessionContext);
	if (!session) {
		throw new Error("SessionContext is not defined");
	}
	return session;
};
