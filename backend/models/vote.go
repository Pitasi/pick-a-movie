package models

type Vote struct {
	Id         int64 `json:"id" pg:"id,pk" validate:"required"`
	ProposalId int64 `json:"proposalId" validate:"required"`
	Resource
} //@name Vote

type CreateVoteRequest struct {
	ProposalId int64 `json:"id" validate:"required"`
} //@name CreateVoteRequest
