package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/Pitasi/pick-a-movie/lib"
	"github.com/Pitasi/pick-a-movie/models"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

// @summary Create a new vote
// @description create vote
// @accept  json
// @param	request body models.CreateVoteRequest true "Request Body"
// @produce  json
// @tags Vote
// @success 200 {object} models.Vote
// @failure 400 {string} string "Invalid payload"
// @failure 403 {string} string "Proposal session closed"
// @failure 404 {string} string "Proposal not found"
// @failure 500 {string} string "Database operation failed"
// @router /votes [post]
func createVote(dm *lib.DBManager) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		rq := new(models.CreateVoteRequest)
		err := json.NewDecoder(r.Body).Decode(rq)
		if err != nil {
			rw.WriteHeader(400)
			log.Printf("[E]: %s", err)
			return
		}

		res, err := dm.DB.Model(&models.Proposal{}).Where("Id = ?0", rq.ProposalId).Exists()
		if err != nil || !res {
			rw.WriteHeader(404)
			log.Printf("[E]: %s - %t", err.Error(), res)
			return
		}

		s := new(models.Proposal)
		err = dm.DB.Model(s).
			Where("Proposal.Id = ?0", rq.ProposalId).
			Column("_").
			Relation("Session").
			Select()

		if err != nil {
			rw.WriteHeader(500)
			log.Printf("[E]: %s", err)
			return
		}

		now := time.Now()

		if s.Session.StartAt.After(now) || s.Session.EndAt.Before(now) {
			rw.WriteHeader(403)
			log.Printf("[E]: session closed - %s - <%s, %s>", now.Format("2006-01-02T15:04:05"), s.Session.StartAt.Format("2006-01-02T15:04:05"), s.Session.EndAt.Format("2006-01-02T15:04:05"))
			return
		}

		item := &models.Vote{
			ProposalId: rq.ProposalId,
			VoterId:    rq.VoterId,
		}

		_, err = dm.DB.Model(item).Insert()
		if err != nil {
			rw.WriteHeader(500)
			log.Printf("[E]: %s", err)
			return
		} else {
			render.JSON(rw, r, item)
		}
	}
}

// @summary Delete a vote
// @description delete vote
// @accept  json
// @param id path string true "Vote ID"
// @tags Vote
// @success 200
// @failure 400 {string} string "Invalid payload"
// @failure 403 {string} string "Proposal session closed"
// @failure 404 {string} string "Proposal not found"
// @failure 500 {string} string "Database operation failed"
// @router /votes/{id} [delete]
func deleteVote(dm *lib.DBManager) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
		if err != nil {
			rw.WriteHeader(400)
			log.Printf("[E]: %s", err)
			return
		}

		res, err := dm.DB.Model(&models.Vote{}).Where("Id = ?0", id).Delete()
		if err != nil {
			rw.WriteHeader(404)
			log.Printf("[E]: %s - %t", err.Error(), res)
			return
		}
	}
}

func NewVoteController(dm *lib.DBManager) http.Handler {
	r := chi.NewRouter()
	r.Post("/", createVote(dm))
	r.Delete("/{id}", deleteVote(dm))
	return r
}
