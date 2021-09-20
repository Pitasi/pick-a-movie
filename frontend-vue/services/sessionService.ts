import { SessionService } from "~/application/ports";
import { Session } from "~/domain/session";

const sessionService: SessionService = {
  async get(id: Uid): Promise<Session> {
    // const res = await fetch(`/api/v1/sessions/${this.listId}`);
    // const data = await res.json();

    const mock = new Session(
      id,
      'the titolo',
      [],
    );

    return mock;
  }
}

export default sessionService;
