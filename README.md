# PocketBase + SvelteKit (static)

It is a template for PocketBase + SvelteKit projects, shipped as a single docker container.

To achieve that, SSR is disabled and authorization is handled on the client side.

## Development

```bash
$ docker compose -f compose.dev.yaml up
```

```bash
$ cd sveltekit
$ bun install
$ bun --bun run dev
```

## Roadmap

- [ ] Production docker compose file
- [ ] Rewrite readme
- [ ] PocketBase & SvelteKit shared .ts types
- [ ] Subscribe to realtime DB updates
- [ ] Add lib/pocketbase.js documentation
- [x] Redirect to ?next= on login
- [x] Run formatter and linter
