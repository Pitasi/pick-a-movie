package models

import "time"

type Resource struct {
	CreatedAt time.Time `json:"createdAt" pg:"default:now()"`
	UpdatedAt time.Time `json:"updatedAt" pg:"default:now()"`
}
