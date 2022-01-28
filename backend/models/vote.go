package models

type Vote struct {
	Id         int64  `json:"id" pg:"id,pk" validate:"required"`
	ProposalId int64  `json:"proposalId" validate:"required"`
	VoterId    string `json:"voterId" validate:"required"`
	Resource
} //@name Vote

type CreateVoteRequest struct {
	ProposalId int64  `json:"id" validate:"required"`
	VoterId    string `json:"voter_id" validate:"required"`
} //@name CreateVoteRequest
