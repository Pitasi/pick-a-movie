import { SessionService } from "~/application/ports";
import { Movie } from "~/domain/movie";
import { Session } from "~/domain/session";

const sessionService: SessionService = {
  async get(id: Uid): Promise<Session> {
    // const res = await fetch(`/api/v1/sessions/${this.listId}`);
    // const data = await res.json();

    const mock = new Session(
      id,
      'the titolo',
      [{
        id: '1',
        movie: new Movie('3', 'The Dark Knight', undefined),
        votes: 2
      }],
    );

    return mock;
  }
}

export default sessionService;
