import { Vote } from "../domain";

export interface LoadingVotesState {
	kind: "LoadingVotesState",
};

export interface LoadedVotesState {
	kind: "LoadedVotesState",
	votes: Vote[],
}

export type VotesState = LoadingVotesState | LoadedVotesState;

export const votesInitialState: VotesState = {
	kind: "LoadingVotesState",
};