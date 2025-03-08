package main

import (
	"embed"
	"io/fs"
	"log"
	"os"
	"strings"

	"github.com/YOUR-ORG/YOUR-REPO/pocketbase/hooks"
	_ "github.com/YOUR-ORG/YOUR-REPO/pocketbase/migrations"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

//go:embed pb_public/*
var staticFS embed.FS

func main() {
	app := pocketbase.New()

	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	// Docs https://pocketbase.io/docs/go-migrations/
	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: isGoRun,
	})

	serveStatic(app)
	hooks.Register(app)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

func serveStatic(app core.App) {
	// Docs https://pocketbase.io/docs/go-overview/
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		pb_public, err := fs.Sub(staticFS, "pb_public")
		if err != nil {
			return err
		}
		se.Router.GET("/{path...}", apis.Static(pb_public, false))
		return se.Next()
	})
}
