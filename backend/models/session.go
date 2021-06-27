package models

import "time"

type Session struct {
	Id        int64       `json:"id" pg:"id,pk" validate:"required"`
	StartAt   time.Time   `json:"startAt" validate:"required" example:"2011-10-05T14:48:00.000Z"`
	EndAt     time.Time   `json:"endAt" validate:"required" example:"2011-10-05T14:48:00.000Z"`
	Proposals []*Proposal `json:"proposals" pg:"rel:has-many"`
	Resource
} //@name Session

type CreateSessionRequest struct {
	StartAt time.Time `json:"startAt" validate:"required"`
	EndAt   time.Time `json:"endAt" validate:"required"`
} //@name CreateSessionRequest
