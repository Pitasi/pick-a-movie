package lib

import (
	"os"
)

func fallbackEnv(key, fallback string) string {
	if v, _ := os.LookupEnv(key); len(v) != 0 {
		return v
	} else {
		return fallback
	}
}
