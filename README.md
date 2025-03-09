# PocketBase + SvelteKit (Static) Project Template

> It's `v2` of the template. The old version could be found in branch `v1`.

Welcome to the PocketBase + SvelteKit project template!
This template allows you to effortlessly create a single Docker container housing both the backend (PocketBase) and frontend (SvelteKit) for your projects.
With a minimal image size of just 59 MB, it's perfect for cost-effective hosting providers and projects without extensive public pages that require SEO. It's still possible to prerender some pages with SvelteKit, but it's not the main focus of this template.

## Features

- PocketBase extended with Go (PocketBase 0.25.8)
- SvelteKit with adapter-static (Svelte 5.22.2, TypeScript, Tailwind CSS)
- Ready to use login, registration, and auth-requiring routes
- Single binary with embedded frontend (~47 MB)
- GitHub Action to build and push the Docker image (~59 MB) to `ghcr.io`

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

## Contributing

We welcome contributions! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License.

## Acknowledgements

Special thanks to PocketBase, SvelteKit, and the authors of other PocketBase-SvelteKit templates ([1](https://github.com/danawoodman/sveltekit-auth-example), [2](https://github.com/jianyuan/pocketbase-sveltekit-auth)).

## Contact

If you have any questions or feedback, please use the [GitHub Issues](https://github.com/Egor-S/pocketbase-sveltekit-static/issues) page.
