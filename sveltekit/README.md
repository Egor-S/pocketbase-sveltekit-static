# pocketbase-sveltekit-static/sveltekit

Run `npm run dev` to start the SvelteKit dev server.
It will also proxy all requests to `/_/*` and `/api/*` to `localhost:8090` (your PocketBase server).

## SSR and Authorization

- SSR is disabled for simplified deployment, sacrificing SEO features.
- Authorization is handled on the client side. Note, users can fetch all frontend resources, including pre-rendered pages and JS bundles. **Sensitive information must be served from PocketBase.**

## Structure explained

- `src/lib/auth.ts` - the `user` store and form-enhance methods for `login` and `register` pages
- `src/lib/pocketbase.ts` - the default PocketBase client
- `src/routes/(auth)` - all routes in this directory requires authentication. If session token is not valid, the user will be redirected to `/login`. If the user is authenticated, the session token will be refreshed
- `src/routes/(login)` - if there is a valid session token, the user will be redirected to `/`
  - `/login` - the login page
  - `/register` - the registration page

## How it was built

```bash
npx sv create sveltekit --template minimal --types ts
```

- add ons: prettier, eslint, tailwindcss, sveltekit-adapter
- tailwindcss plugins: none
- sveltekit-adapter: static
- package manager: npm

```bash
npm install --save-dev pocketbase
npm install --save-dev @trivago/prettier-plugin-sort-imports
```
