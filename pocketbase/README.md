# pocketbase-sveltekit-static/pocketbase

Run `go run . serve` to start the PocketBase dev server.

## Structure explained

- `hooks` - put and register your hooks here. Consider using a submodule per feature
- `migrations` - if PocketBase is run with `go run`, automatically created migrations will be placed here
- `pb_public` - ignore. The frontend files from `sveltekit/build` will be copied here during the build process
- `main.go` - the entry point

## How it was built

```bash
go mod init github.com/YOUR-ORG/YOUR-REPO/pocketbase
go get github.com/pocketbase/pocketbase
```
