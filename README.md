# DS Dance Research Lab website

## GitHub repository preparation

This folder is ready to be pushed to a new GitHub repository, but Git has not been initialised here. `.gitignore` excludes local dependencies, Next.js build output, local environment files and private keys. Keep `.env.example` and `.env.production.example` in the repository; never commit the real `.env` file.

## Local development

1. Copy `.env.example` to `.env`.
2. Start this website with `docker compose up -d --build`.
3. Open `http://localhost:3001`.

The website reads published content from JPanel and relays Contact and Join Us submissions to JPanel through a server-only Next.js route. No JPanel code is changed by this website project.

## JPanel connection

Set `CMS_ENABLED=true` and `INQUIRIES_ENABLED=true`, then configure:

- `JPANEL_API_URL=https://jpanel.jivita.lk/api`
- `JPANEL_SITE_SLUG=ds-dance`
- `JPANEL_SITE_API_KEY=<site-scoped inquiries:write key>`

The API key is used only by the server-side inquiry route. Do not add it to `NEXT_PUBLIC_*` variables, commit it, or submit directly to JPanel from browser code.

The browser posts to `/api/inquiries`; that route validates the request, attaches the key and an idempotency identifier, and forwards it to JPanel. Successful submissions appear in the JPanel Inquiries dashboard as either `Contact` or `Join Us`.

## Commands

- `npm run typecheck`
- `npm run build`
- `npm run migration:inventory`

## Project structure

The website follows the Next.js App Router convention. Each public URL has its own route folder instead of sharing one catch-all page:

- `app/` — route pages, global states, layout and API routes.
- `components/layout/` — global header and footer.
- `components/ui/` — reusable visual building blocks.
- `components/content/` — project, blog and detail presentation.
- `components/forms/` — inquiry pages and form behavior.
- `components/gallery/` — gallery and lightbox behavior.
- `components/motion/` — progressive reveal behavior.
- `content/` — approved static page wording.
- `data/` — reviewed local seed records.
- `lib/` — server-side content access.
- `types/` — shared content contracts.
- `config/` — navigation and other site configuration.

Route files should compose shared components and own only the data selection and metadata for their URL. Keep client-side code limited to genuinely interactive components.

## Production

Use `.env.production.example` as the deployment template. The public WordPress website remains live until the replacement has been approved and deployed to the VPS.
