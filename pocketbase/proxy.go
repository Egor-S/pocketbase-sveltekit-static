package main

import (
	"net/http/httputil"
	"net/url"

	"github.com/pocketbase/pocketbase/core"
)

// registerProxy redirects all unmatched requests to the target URL
func registerProxy(app core.App, target string) {
	app.OnServe().BindFunc(func(e *core.ServeEvent) error {
		targetURL, err := url.Parse(target)
		if err != nil {
			return err
		}
		proxy := httputil.NewSingleHostReverseProxy(targetURL)

		e.Router.Any("/", func(e *core.RequestEvent) error {
			proxy.ServeHTTP(e.Response, e.Request)
			return nil
		})

		return e.Next()
	})
}
