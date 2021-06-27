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

// @summary List sessions
// @description get sessions
// @accept  json
// @produce  json
// @tags Session
// @success 200 {array} models.Session
// @router /sessions [get]
func getSessions(dm *lib.DBManager) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		items := []models.Session{}
		dm.DB.Model(&items).Relation("Proposals").Select()
		render.JSON(rw, r, items)
	}
}

// @summary Get a session
// @description get a specific session
// @accept  json
// @produce  json
// @param id path string true "Session ID"
// @tags Session
// @success 200 {object} models.Session
// @failure 400 {string} string "Invalid payload"
// @failure 404 {string} string "Session not found"
// @failure 500 {string} string "Database operation failed"
// @router /sessions/{id} [get]
func getSession(dm *lib.DBManager) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
		if err != nil {
			rw.WriteHeader(400)
			log.Printf("[E]: %s", err)
			return
		}

		var item models.Session
		err = dm.DB.Model(&item).Where("id = ?0", id).Relation("Proposals").Select()

		if item.Proposals == nil {
			item.Proposals = []*models.Proposal{}
		}

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

// @summary Create a new session
// @description create session
// @accept  json
// @param	request body models.CreateSessionRequest true "Request Body"
// @produce  json
// @tags Session
// @success 200 {object} models.Session
// @failure 400 {string} string "Invalid payload"
// @failure 500 {string} string "Database operation failed"
// @router /sessions [post]
func createSession(dm *lib.DBManager) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		rq := new(models.CreateSessionRequest)
		err := json.NewDecoder(r.Body).Decode(rq)
		if err != nil {
			rw.WriteHeader(400)
			log.Printf("[E]: %s", err.Error())
			return
		}

		if rq.EndAt.Before(rq.StartAt) {
			rw.WriteHeader(400)
			log.Printf("[E]: %s", err.Error())
			return
		}

		item := &models.Session{
			StartAt: rq.StartAt,
			EndAt:   rq.EndAt,
		}

		_, err = dm.DB.Model(item).Insert()
		if err != nil {
			rw.WriteHeader(500)
			log.Printf("[E]: %s", err.Error())
		} else {
			log.Println(item.Proposals)
			render.JSON(rw, r, item)
		}
	}
}

func NewSessionController(dm *lib.DBManager) http.Handler {
	r := chi.NewRouter()

	r.Get("/", getSessions(dm))
	r.Get("/{id}", getSession(dm))
	r.Post("/", createSession(dm))

	return r
}
