import { Proposal } from "./proposal";

/**
 * Main class of the domain. It holds a list of movies that users can vote for.
 */
export class Session {
  id: Uid;
  title: string;
  proposals: Proposal[];

  constructor(
    id: Uid,
    title: string,
    proposals: Proposal[],
  ) {
    this.id = id;
    this.title = title;
    this.proposals = proposals;
  }
}
