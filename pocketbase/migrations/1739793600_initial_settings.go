package migrations

import (
	"ganigeorgiev.com/pocketbase/pocketbase/core"
	m "ganigeorgiev.com/pocketbase/pocketbase/migrations"
)

func init() {
	// Docs https://pocketbase.io/docs/go-migrations/#initialize-default-application-settings
	m.Register(func(app core.App) error {
		settings := app.Settings()

		// for all available settings fields you could check
		// https://ganigeorgiev.com/pocketbase/pocketbase/files/core/settings_model.go?rev=refs/tags/v0.41.1
		settings.Meta.AppName = "github.com/YOUR-ORG/YOUR-REPO"
		settings.Meta.AppURL = "http://localhost:8090"
		settings.Logs.MaxDays = 3
		settings.Logs.LogAuthId = true
		settings.Logs.LogIP = false

		return app.Save(settings)
	}, nil)
}
