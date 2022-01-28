package models

type Proposal struct {
	Id        int64    `json:"id" pg:"id,pk" validate:"required"`
	MovieId   int      `json:"movieId" pg:",unique:session_movie" validate:"required"`
	Comment   string   `json:"comment"`
	SessionId int64    `json:"sessionId" pg:",unique:session_movie" validate:"required"`
	Session   *Session `json:"session" pg:"rel:has-one"`
	Votes     []*Vote  `json:"votes" pg:"rel:has-many"`
	Resource
} //@name Proposal

type CreateProposalRequest struct {
	SessionId int64  `json:"sessionId" validate:"required"`
	MovieId   int    `json:"movieId" validate:"required"`
	Comment   string `json:"comment"`
} //@name CreateProposalRequest
