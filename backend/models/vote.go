package models

type Vote struct {
	Id         int64  `json:"id" pg:"id,pk" validate:"required"`
	ProposalId int64  `json:"proposalId" pg:",unique:proposal_voter" validate:"required"`
	VoterId    string `json:"voterId" pg:",unique:proposal_voter" validate:"required"`
	Resource
} //@name Vote

type CreateVoteRequest struct {
	ProposalId int64  `json:"id" validate:"required"`
	VoterId    string `json:"voterId" validate:"required"`
} //@name CreateVoteRequest
