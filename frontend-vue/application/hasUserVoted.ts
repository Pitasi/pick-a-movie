import { Proposal } from "~/domain/proposal";

async function hasUserVoted(proposal: Proposal): Promise<boolean> {
  await Promise.resolve();
  return false;
}

export default hasUserVoted;
