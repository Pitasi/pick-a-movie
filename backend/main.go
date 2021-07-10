package main

import (
	"fmt"
	"log"
	"net/http"

	chi "github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"github.com/Pitasi/pick-a-movie/controllers"
	_ "github.com/Pitasi/pick-a-movie/docs"
	"github.com/Pitasi/pick-a-movie/lib"
	"github.com/Pitasi/pick-a-movie/models"
	httpSwagger "github.com/swaggo/http-swagger"
)

const (
	HOST = "localhost"
	PORT = 1337
)

// @title PickAMovie Swagger API
// @version 1.0
// @description May the force be with us
// @host localhost:1337
// @BasePath /v1
// @tag.name Proposal
// @tag.name Session
// @tag.name Vote
func main() {

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "https://pick-a-movie*.vercel.app"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	dbManager := lib.NewManager()
	defer func() {
		log.Println("Database Manager closed the connection")
		dbManager.Close()
	}()

	err := dbManager.CreateSchema([]lib.StorableResource{
		(*models.Proposal)(nil),
		(*models.Vote)(nil),
		(*models.Session)(nil),
	})

	if err != nil {
		log.Panic(err)
	} else {
		log.Println("Database Schema successfully created")
	}

	r.NotFound(func(rw http.ResponseWriter, r *http.Request) {
		rw.WriteHeader(404)
	})

	r.Get("/swagger/*", httpSwagger.Handler(
		httpSwagger.URL(fmt.Sprintf("http://%s:%d/swagger/doc.json", HOST, PORT)),
	))

	r.Route("/v1", func(r chi.Router) {
		r.Mount("/proposals", controllers.NewProposalController(dbManager))
		r.Mount("/sessions", controllers.NewSessionController(dbManager))
		r.Mount("/votes", controllers.NewVoteController(dbManager))
	})

	err = http.ListenAndServe(fmt.Sprintf(":%d", PORT), r)
	if err != nil {
		log.Panic(err)
	}
}
