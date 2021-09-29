import { Proposal } from "~/domain/proposal";

async function voteProposal(proposal: Proposal): Promise<void> {
  proposal.votes++;
  return await Promise.resolve();
}

export default voteProposal;
