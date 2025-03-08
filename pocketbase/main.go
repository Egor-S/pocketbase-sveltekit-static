package main

import (
	"log"
	"os"
	"strings"

	// _ "github.com/YOUR-ORG/YOUR-REPO/backend/migrations"
	"github.com/YOUR-ORG/YOUR-REPO/pocketbase/hooks"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()

	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	// Docs https://pocketbase.io/docs/go-migrations/
	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: isGoRun,
	})

	hooks.Register(app)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
