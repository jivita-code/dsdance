# DS Dance Research Lab website

## GitHub repository preparation

This folder is ready to be pushed to a new GitHub repository, but Git has not been initialised here. `.gitignore` excludes local dependencies, Next.js build output, local environment files and private keys. Keep `.env.example` and `.env.production.example` in the repository; never commit the real `.env` file.

## Local development

1. Copy `.env.example` to `.env`.
2. Start this website with `docker compose up -d --build`.
3. Open `http://localhost:3001`.

The website is intentionally standalone and displays the reviewed local content dataset. JPanel is not connected, and no JPanel code is changed by this website project.

## Future JPanel connection

Only after separate approval, set `CMS_ENABLED=true` and configure:

- `JPANEL_API_URL=http://host.docker.internal:3000` locally, or `https://jpanel.jivita.lk/api` in production.
- `JPANEL_SITE_SLUG=ds-dance-research-lab`
- `JPANEL_SITE_API_KEY=<site inquiry key>`

The API key is used only by the server-side inquiry route. Do not add it to `NEXT_PUBLIC_*` variables.

No JPanel setup is part of this build. A future integration can use `https://jpanel.jivita.lk/api` as the production API endpoint, subject to a separate instruction and credentials.

## Commands

- `npm run typecheck`
- `npm run build`
- `npm run migration:inventory`

## Production

Use `.env.production.example` as the deployment template. The public WordPress website remains live until the replacement has been approved and deployed to the VPS.
