# PocketBase + SvelteKit (Static) Project Template

Welcome to the PocketBase + SvelteKit project template!
This template allows you to effortlessly create a single Docker container housing both the backend (PocketBase) and frontend (SvelteKit) for your projects.
With a minimal image size of just 55 MB, it's perfect for cost-effective hosting providers and projects without extensive public pages that require SEO.

## Project Structure

- `pocketbase/`: Backend files, including hooks and migrations.
- `sveltekit/`: SvelteKit project with preconfigured routes `/login`, `/register`, and an auth-protected group `(auth)`. In production builds, frontend files are copied as `pb_public` to the PocketBase container.

## Features

- Frontend configured with `adapter-static` (SPA mode), disabling server-side rendering for a streamlined production setup.
- Client-side session management is preconfigured.
- Multi-stage Dockerfile for running PocketBase in dev mode (mounting hooks and migrations to the host).
- Bun is used for frontend development and building.

## Usage

1. Run dev PocketBase server: `docker compose -f compose.dev.yaml up`.
2. Run frontend dev server with `bun` or `npm`.
3. Use `PUBLIC_POCKETBASE_URL` env variable if your PocketBase server is not accessible at `localhost:8090`.
4. For production, use `docker compose -f compose.prod.yaml up` or build the Docker image with target `prod` first.

## Dockerfile Details

- Multistage build with targets:
  - `base`: Used for the dev server with all PocketBase directories mounted.
  - `prod`: Used for the production build, embedding frontend, hooks, and migrations into the image.

## SSR and Authorization

- SSR is disabled for simplified deployment, sacrificing SEO features.
- Authorization is handled on the client side. Note, users can fetch all frontend resources, including pre-rendered pages and JS bundles. **Sensitive information must be served from PocketBase.**

## Contributing

We welcome contributions! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License.

## Acknowledgements

Special thanks to PocketBase, SvelteKit, and the authors of other PocketBase-SvelteKit templates ([1](https://github.com/danawoodman/sveltekit-auth-example), [2](https://github.com/jianyuan/pocketbase-sveltekit-auth)).

## Contact

If you have any questions or feedback, please use the [GitHub Issues](https://github.com/Egor-S/pocketbase-sveltekit-static/issues) page.

## Roadmap

- [x] Production docker compose file
- [x] Rewrite readme
- [ ] PocketBase & SvelteKit shared .ts types
- [ ] Subscribe to realtime DB updates
- [ ] Add lib/pocketbase.js documentation
- [x] Redirect to ?next= on login
- [x] Run formatter and linter
