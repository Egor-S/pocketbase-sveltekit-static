# PocketBase + SvelteKit (Static) Project Template

> [!TIP]
> Check out my new template [pocketbase-react-static](https://github.com/Egor-S/pocketbase-react-static)

> It's `v2` of the template. The old version could be found in branch `v1`.

Welcome to the PocketBase + SvelteKit project template!
This template allows you to effortlessly create a single Docker container housing both the backend (PocketBase) and frontend (SvelteKit) for your projects.
With a minimal image size of around 70 MB, it's perfect for cost-effective hosting providers and projects without extensive public pages that require SEO. It's still possible to prerender some pages with SvelteKit, but it's not the main focus of this template.

This is a static single-page app (`adapter-static` + `ssr = false`), so SvelteKit form actions and remote functions don't apply here -- there's no server to run them against. Auth flows use plain client-side calls to the PocketBase JS SDK instead.

## Features

- PocketBase extended with Go
- SvelteKit with adapter-static (Svelte 5, TypeScript, Tailwind CSS)
- Ready to use login, registration, and auth-requiring routes
  - Route guards are UI-only: the check ships in the public JS bundle. Gate any sensitive data server-side with PocketBase collection API rules.
- Single binary with embedded frontend (~32 MB)
- GitHub Action to build and push a Docker image (~70 MB) to `ghcr.io`, triggered by a release or manually

## Quickstart

1. Fork this repository
   - Replace all `github.com/YOUR-ORG/YOUR-REPO` to your GitHub repo. For instance, `github.com/Egor-S/my-awesome-project`
   - Update default app settings in `pocketbase/migrations/1739793600_initial_settings.go`
1. Start your PocketBase server `cd pocketbase && go run . serve` in the first terminal
   - Create a superuser account
1. Start your SvelteKit dev server `cd sveltekit && npm run dev` in the second terminal
1. Access both SvelteKit and PocketBase at `localhost:5173`

Find more details in respective README files.

## Build and run Docker image

To build the Docker image locally, run:

```bash
docker build . -t my-awesome-project:latest
```

The image is simple enough to be run without `docker compose`:

```bash
docker run -p 8090:8090 -v ./pb_data:/app/pb_data my-awesome-project:latest
```

### Get single binary

```bash
container_id=$(docker create my-awesome-project:latest)
docker cp $container_id:/app/pocketbase ./pocketbase
docker rm $container_id
```

### Publish with GitHub Actions

`.github/workflows/build.yaml` builds and pushes an image to GHCR (`ghcr.io/<owner>/<repo>`), `linux/amd64` by default — edit the `PLATFORMS` env var in the workflow (e.g. add `,linux/arm64`) to build for more:

- **Cut a GitHub Release** tagged `vX.Y.Z` — publishing it triggers the workflow and pushes an image tagged to match.
- Or trigger it manually (Actions → Build Docker image → Run workflow) with an arbitrary `tag` input, e.g. to rebuild without cutting a new release.

No extra secrets needed — it authenticates to GHCR with the default `GITHUB_TOKEN`.

## Contributing

We welcome contributions! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License.

## Acknowledgements

Special thanks to PocketBase, SvelteKit, and the authors of other PocketBase-SvelteKit templates ([1](https://github.com/danawoodman/sveltekit-auth-example), [2](https://github.com/jianyuan/pocketbase-sveltekit-auth)).

## Contact

If you have any questions or feedback, please use the [GitHub Issues](https://github.com/Egor-S/pocketbase-sveltekit-static/issues) page.
