package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/Pitasi/pick-a-movie/lib"
	"github.com/Pitasi/pick-a-movie/models"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/go-pg/pg/v10"
)

// @summary Get a proposal
// @description get a specific proposal
// @accept  json
// @produce  json
// @tags Proposal
// @param id path string true "Proposal ID"
// @success 200 {object} models.Proposal
// @failure 400 {string} string "Invalid payload"
// @failure 404 {string} string "Proposal not found"
// @failure 500 {string} string "Database operation failed"
// @router /proposals/{id} [get]
func getProposal(dm *lib.DBManager) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
		if err != nil {
			rw.WriteHeader(400)
			log.Printf("[E]: %s", err)
			return
		}

		var item models.Proposal
		err = dm.DB.Model(&item).Where("Proposal.id = ?0", id).Relation("Votes").Relation("Session").First()

		if err == pg.ErrNoRows {
			rw.WriteHeader(404)
			log.Printf("[E]: %s", err)
		} else if err != nil {
			rw.WriteHeader(500)
			log.Printf("[E]: %s", err)
		} else {
			render.JSON(rw, r, item)
		}
	}
}

// @summary List proposals
// @description get proposals
// @accept  json
// @produce  json
// @tags Proposal
// @success 200 {array} models.Proposal
// @router /proposals [get]
func getProposals(dm *lib.DBManager) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		items := []models.Proposal{}
		dm.DB.Model(&items).Relation("Votes").Relation("Session").Select()
		render.JSON(rw, r, items)
	}
}

// @summary Create a new proposal
// @description create proposals
// @accept  json
// @param	request body models.CreateProposalRequest true "Request Body"
// @produce  json
// @tags Proposal
// @success 200 {object} models.Proposal
// @failure 400 {string} string "Invalid payload"
// @failure 404 {string} string "Session ID not found"
// @failure 500 {string} string "Database operation failed"
// @router /proposals [post]
func createProposal(dm *lib.DBManager) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		rq := new(models.CreateProposalRequest)
		err := json.NewDecoder(r.Body).Decode(rq)
		if err != nil {
			rw.WriteHeader(400)
			log.Printf("[E]: %s", err)
			return
		}

		res, err := dm.DB.Model(&models.Session{}).Where("Id = ?0", rq.SessionId).Exists()
		if err != nil || !res {
			rw.WriteHeader(404)
			log.Printf("[E]: %s", err.Error())
			return
		}

		item := &models.Proposal{
			MovieId:   rq.MovieId,
			Comment:   rq.Comment,
			SessionId: rq.SessionId,
		}

		_, err = dm.DB.Model(item).Relation("Session").Insert()
		if err != nil {
			rw.WriteHeader(500)
			log.Printf("[E]: %s", err)
		} else {
			render.JSON(rw, r, item)
		}
	}
}

func NewProposalController(dm *lib.DBManager) http.Handler {
	r := chi.NewRouter()

	r.Get("/", getProposals(dm))
	r.Get("/{id}", getProposal(dm))
	r.Post("/", createProposal(dm))

	return r
}
