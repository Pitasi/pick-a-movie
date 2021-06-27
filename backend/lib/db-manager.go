package lib

import (
	"fmt"

	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
)

type DBManager struct {
	DB *pg.DB
}

// Config
var dbUser string
var dbPass string
var dbHost string
var dbPort string
var dbDatabase string

type StorableResource interface{}

func init() {
	dbUser = fallbackEnv("DB_USER", "postgres")
	dbPass = fallbackEnv("DB_PASSWORD", "notSoCoolPassword")
	dbHost = fallbackEnv("DB_HOST", "localhost")
	dbPort = fallbackEnv("DB_PORT", "5432")
	dbDatabase = fallbackEnv("DB_DATABASE", "PickAMovie")
}

func NewManager() *DBManager {
	return &DBManager{
		DB: pg.Connect(&pg.Options{
			User:     dbUser,
			Password: dbPass,
			Database: dbDatabase,
			Addr:     fmt.Sprintf("%s:%s", dbHost, dbPort),
		}),
	}
}

func (m *DBManager) Close() {
	m.DB.Close()
}

func (m *DBManager) CreateSchema(resources []StorableResource) error {
	for _, resource := range resources {
		model := m.DB.Model(resource)

		model.DropTable(&orm.DropTableOptions{
			IfExists: true,
			Cascade:  true,
		})

		err := model.CreateTable(&orm.CreateTableOptions{})
		if err != nil {
			return err
		}
	}
	return nil
}
