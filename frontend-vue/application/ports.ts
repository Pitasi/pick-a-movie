import { Session } from "~/domain/session";

export interface SessionService {
  get(id: Uid): Promise<Session>;
}
