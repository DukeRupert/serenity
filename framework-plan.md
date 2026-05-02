# Serenity: A Code Generator for Logan's Go Web Stack

**Status:** Planning document
**Author:** Logan Williams
**Date:** May 2026

---

## What this is

Serenity is a personal CLI code generator that encodes Logan's existing Go web development stack into a set of project bootstrappers and feature scaffolders. It is not a framework in the runtime sense — generated code has no `serenity` import. It is a tool that runs at development time to eliminate the boilerplate that sits between an idea and a working feature.

The generated code *is* the application. There is no framework to fight, escape, or migrate away from. If a generator's output isn't quite right, the developer edits the generated code directly — and optionally updates the template so the next run produces what they want.

## Why build this

Three reinforcing motivations:

1. **Eliminate per-project boilerplate.** Every new project (Skalkaho, Hiri, CairnPost, Wantok, Manifest, Packstring, the church reservation system, plus client work) repeats the same first 4-6 hours of setup: project layout, chi router, templ wiring, sqlc + goose configuration, Caddyfile, Dockerfile, GitHub Actions deploy workflow, auth scaffold, and so on. A `serenity init` removes this entirely.

2. **Eliminate per-feature boilerplate.** Every CRUD resource is roughly 9 files of plumbing: migration, sqlc query, request struct, handler, route registration, templ views (index/show/new/edit), and a test scaffold. A `serenity make:resource` collapses this to a single command.

3. **Make the stack agent-friendly by construction.** Claude (and other coding agents) work dramatically better against Go than against Laravel or other reflection-heavy frameworks. A generator-based, codegen-everywhere, no-runtime-magic framework amplifies this advantage. Specific agent affordances (`serenity agent:context`, `serenity agent:check`, `serenity agent:diff`) make the project legible to agents in a way no existing Go framework attempts.

This project does not need to be valuable to the broader Go community. It only needs to be valuable to Logan.

## What this is not

To stay focused, Serenity explicitly does not try to be:

- A Laravel clone in Go. No service container, no facades, no Eloquent-style ORM, no Blade equivalent (templ is already better), no model events/observers, no auto-discovery via reflection, no string-key dynamic config.
- A general-purpose Go web framework. The stack is opinionated and reflects Logan's preferences. Other developers can use it or adapt it; broad adoption is not a goal.
- A runtime framework. No package gets imported by the deployed application. Serenity only runs at development time.
- A deployment tool. Generated projects deploy via the existing Hetzner + Caddy + Docker Compose + GitHub Actions pipeline. No cloud coupling.
- A Laravel Nova / admin dashboard product. Optional admin scaffolding may exist (Tier 3), but the project is not "Firebase but Go."

## The encoded stack

Serenity assumes and generates code for the following stack, which Logan already uses across all current projects:

| Layer | Tool |
|---|---|
| Language | Go |
| HTTP routing | stdlib `net/http.ServeMux` (Go 1.22+ method-based routing) |
| Views | templ |
| Interactivity | htmx + Alpine.js |
| Styles | Tailwind CSS (with `flint-ui` shared components for FlintCraft work) |
| Database | SQLite or PostgreSQL |
| Query layer | sqlc |
| Migrations | goose |
| Background jobs | River (Postgres) or goqite (SQLite), behind a `jobs.Queue` interface |
| Email | Pluggable `mailer.Mailer` interface; Postmark default, SendGrid/SES/SMTP/test alternatives |
| Deployment | Hetzner VPS + Caddy + Docker Compose + GitHub Actions |
| Error tracking | Sentry (SaaS or self-hosted) |
| Health checks | `/healthz` endpoint (consumed by Uptime Kuma or any other monitor) |
| Metrics | Prometheus via `/metrics` endpoint, with default HTTP middleware metrics |
| Analytics | Plausible (where applicable) |
| Dashboards | Grafana |

Stack changes are expected over time. Templates are versioned and overridable per-project (see Extensibility below).

### Stack rationale

A few choices warrant explicit reasoning so future-you (or an agent reading this doc) understands why the defaults are what they are:

**stdlib `http.ServeMux` over chi.** Go 1.22+ supports method-based routing and path parameters in the standard library. The remaining gaps (middleware chaining sugar, route grouping) are 30 lines of helper code generated into each project. Sticking with stdlib means one less dependency, no version drift between projects, and code that any Go developer can read without learning a router's specific API.

**River for Postgres, goqite for SQLite.** River is the right answer when Postgres is already present — type-safe Go API, good dashboard, active development. It does not run on SQLite, and several Serenity-shaped projects (Wantok, parts of CairnPost, various FlintCraft client builds) deliberately stay on SQLite to preserve the single-binary deploy story. goqite fills that gap with a SQLite-native queue. Both are wrapped behind a small `jobs.Queue` interface so generated job code is portable.

River is MPL-2.0 licensed, goqite is MIT. MPL-2.0 is a file-level weak copyleft license that Mozilla designed specifically to permit inclusion in commercial software — using River in proprietary apps is fine, the same way Firefox-derived products work. The compliance requirement is essentially "don't fork River's source files into proprietary modifications, and acknowledge MPL components in a notice file." `serenity init` generates a `THIRD_PARTY_LICENSES.md` file automatically that satisfies this. For the rare client with a strict no-copyleft policy, defaulting to goqite + Postgres (rather than River) is a one-line wiring change.

An Apache-2.0 alternative was considered (it would be slightly more permissive, allowing forks to be kept proprietary). No mature Apache-licensed Go-native Postgres job queue exists with River's feature set; PgQue is Apache but a different shape of tool, and Asynq is MIT but Redis-based. The licensing difference would only matter if forking the library — which the framework does not do — so River's MPL-2.0 status is accepted as a non-issue.

**Pluggable mailer interface.** Different clients have different email providers. Postmark is the default (good deliverability, reasonable pricing, clean API), but SendGrid, SES, and SMTP are realistic alternatives depending on the client's existing infrastructure. The interface is small enough (`Send`, `SendBatch`) that adding a new provider is an afternoon. A no-op/recorder implementation enables testing without sending real mail.

**Sentry over Bugsink.** Stability and ecosystem maturity. Sentry's Go SDK is solid, the dashboard is reliable, and self-hosted Sentry is an option if Hetzner-resident error tracking matters for a particular project. Bugsink was evaluated and found wanting in stability.

**`/healthz` endpoint, monitor-agnostic.** The framework owns the endpoint contract (200 if DB ping succeeds, 503 otherwise). The choice of monitor — Uptime Kuma, BetterStack, Pingdom, or anything else — is a deployment-time decision outside the framework's concern.

**Prometheus `/metrics` with route-pattern labels.** The `/metrics` endpoint exposes default Go runtime metrics plus HTTP request count and latency histograms from middleware. Labels use route patterns (e.g., `/posts/{id}`), not raw paths (e.g., `/posts/42`), to avoid label cardinality explosions. Custom application metrics are then up to the developer.

## Design principles

These are the non-negotiable design commitments. Anything that conflicts with these gets cut.

### 1. Templates, not magic
Every generator is a Go template plus a small driver. Templates are readable, editable, and copy-pasteable. There is no metaprogramming, no reflection, no runtime container.

### 2. Generated code is the developer's code
After generation, Serenity has no further role in the project's runtime. The developer owns every line of generated code and can modify it freely. There is no "fighting the framework" because there is no framework.

### 3. Conventions, not configuration
Project layout is fixed (`cmd/server`, `internal/<feature>`, `migrations/`, `queries/`, `assets/`, `views/layouts/`, etc.). No options. Deviations happen by editing generated code, not by configuring the generator.

### 4. Compile-time over runtime
All "magic" happens at code generation or compile time. sqlc generates query functions. templ generates view functions. Serenity generates handlers and routes. The deployed binary contains zero reflection-based dispatch.

### 5. Single binary, embedded assets
Generated projects produce one Go binary with templ-compiled views, sqlc queries, migrations (via `embed.FS`), and static assets baked in. Hetzner deploys are a single file copy plus a Caddy reload.

### 6. Idempotent and updatable
`serenity make:resource Post` is safe to re-run. Either it errors with a clear message and points to `serenity update:resource`, or it performs a 3-way merge. Re-running a generator should never silently destroy hand-edited code.

### 7. Agent-legible by construction
Project structure, naming conventions, and generation outputs are designed to be machine-readable. `serenity agent:context` produces a current, accurate description of any project. Agents do not have to guess.

## The generator surface

Generators are organized into four tiers by frequency of use. Build order roughly follows tier order, but Tier 4 (agent affordances) is interleaved early because that's where the novel value lives.

### Tier 1 — Used weekly

#### `serenity init <project>`
Bootstraps a new Go web project with the full stack pre-wired.

Asks 6-8 questions:
- Project type: web app, JSON API, or both?
- Database: SQLite or PostgreSQL?
- Include auth scaffold?
- Include background jobs? (auto-picks River for Postgres, goqite for SQLite)
- Email provider: Postmark, SendGrid, SES, SMTP, or none?
- Include Sentry error tracking?
- UI component layer: `flint-ui` (default), `bare` Tailwind, or `custom` module path?
- Module path?

Generates:
- Project directory structure
- `go.mod`, `go.sum`
- stdlib `http.ServeMux` router with middleware stack
- templ setup with base layout
- sqlc + goose configured against chosen DB
- `jobs.Queue` interface with River or goqite implementation if jobs were chosen
- `mailer.Mailer` interface with chosen provider implementation if mail was chosen
- Auth scaffold if chosen (sessions + argon2)
- Sentry initialization in `main.go` plus panic recovery middleware if chosen
- `/healthz` endpoint with DB ping
- `/metrics` endpoint with Prometheus HTTP middleware (route-pattern labels, not raw paths)
- `Caddyfile` for local and production
- `Dockerfile` and `docker-compose.yml`
- `.github/workflows/deploy.yml` for the standard Hetzner pipeline
- `.env.example` with all required env vars
- `serenity.toml` recording the Serenity version, stack choices, and UI component layer
- `THIRD_PARTY_LICENSES.md` listing dependency licenses (satisfies MPL-2.0 notice requirements for River and similar)
- Agent skill files (`/architect.md`, `/implement.md`, `/review.md`)
- `README.md` with project-specific setup instructions

Time saved per project: 4-6 hours.

#### `serenity make:resource <Name>`
The marquee feature. Generates a complete CRUD vertical slice for a domain entity.

Generates:
- Migration file (`migrations/NNNN_create_posts.sql`)
- sqlc queries (`queries/posts.sql`) with standard CRUD: `Create`, `Get`, `List`, `Update`, `Delete`, plus `Count` and a paginated `ListPage`
- Request structs with validation tags (`internal/posts/requests.go`)
- Handler functions for index, show, new, create, edit, update, delete (`internal/posts/handlers.go`)
- Route registration appended to `internal/router/routes.go`
- templ components for index, show, new, edit (`internal/posts/views/*.templ`)
- htmx-aware form partials
- Test scaffold (`internal/posts/handlers_test.go`)
- Nav entry added if a layout file exists

Variants:
- `--api` flag: skips templ views, generates JSON-only handlers
- `--minimal` flag: skips edit/delete (read-only resource)

Time saved per resource: 30-90 minutes of pure boilerplate.

#### `serenity make:page <name>`
Lighter than a resource — for static-ish pages.

Generates:
- Handler stub
- Route registration
- templ component using the project's layout

#### `serenity make:job <name>`
Generates a background job that satisfies the project's `jobs.Queue` interface (River-backed for Postgres projects, goqite-backed for SQLite projects).

Generates:
- Job struct + `Kind()` method + `Work()` method
- Worker registration in the workers list
- Test scaffold

The generated code is queue-agnostic — switching the underlying queue implementation later only requires changing the wiring in `cmd/server/main.go`, not the job code itself.

### Tier 2 — Used monthly

#### `serenity make:component <name>`
Generates a templ component, optionally with Alpine state. Particularly useful for FlintCraft `flint-ui` work.

#### `serenity make:migration <name>`
Just a goose migration file with the project's naming convention. Trivial but eliminates a paper-cut.

#### `serenity make:auth`
One-shot auth scaffold. Run once per project (usually at init time, but available standalone).

Generates:
- User model + sqlc queries
- Sessions table + queries
- argon2 password hashing helpers
- Login, logout, register, password reset, email verification handlers
- Middleware for `RequireAuth` and `OptionalAuth`
- templ views for all auth pages
- Postmark templates for verification and reset emails

#### `serenity make:mailable <name>`
Generates a provider-agnostic email helper plus a templ-based HTML email template. The generated mailable depends on the `mailer.Mailer` interface, not a concrete provider — switching from Postmark to SendGrid (or any other plugin) is a one-line change in `cmd/server/main.go`.

Generates:
- Mailable struct in `internal/mail/<name>.go` (depends on `mailer.Mailer`)
- HTML templ template in `internal/mail/views/<name>.templ`
- Plain-text fallback template
- Test scaffold using the recorder/no-op mailer implementation

#### `serenity make:webhook <name>`
Generates an inbound webhook handler with signature verification, idempotency, and async dispatch.

Generates:
- Handler with signature verification
- Idempotency check using a webhook events table
- River job dispatch for the actual work
- Migration for the webhook events table (first time only)

### Tier 3 — Nice-to-haves

#### `serenity make:admin`
Generates a minimal admin panel — list/create/edit views for a resource, behind auth middleware, in the project's design language. Not a Laravel Nova clone; just enough scaffolding for internal tools like the church reservation system or CairnPost CRM.

#### `serenity make:client <name>`
Generates a typed HTTP client for an external API (QuickBooks, Stripe, Plausible, etc.). Handles retries, structured logging, error wrapping.

#### `serenity make:cli <name>`
Adds a cobra subcommand to the project's CLI binary for one-off ops tasks (CSV imports, bulk emails, data migrations).

#### `serenity make:cron <name>`
A scheduled River job with cron syntax and registration plumbing.

### Tier 4 — Agent affordances

This is the differentiating layer. None of Autostrada, Encore, or PocketBase do this well, and it's where Serenity's "Go is better for agents" thesis pays off.

#### `serenity agent:context`
Emits a single markdown file describing the current project: layout, conventions, where things live, naming patterns, deploy process. Designed to be pasted into a Claude Code session to onboard the agent. Regenerates from project state, so it's always current.

#### `serenity agent:check`
Runs a battery of static checks that catch common agent mistakes:
- Unhandled errors
- sqlc queries that don't match handler signatures
- templ files that don't compile
- Routes registered for handlers that don't exist (and vice versa)
- Missing migration for a referenced table
- Form requests with validation tags but no `Validate()` call site

Returns a structured JSON report the agent can iterate on.

#### `serenity agent:diff`
Given a feature description (or a generator command), outputs the exact list of files a generator would touch — without writing them. Lets the agent plan before it acts.

## Project layout (generated)

```
project/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── auth/
│   ├── posts/                    # one directory per make:resource
│   │   ├── handlers.go
│   │   ├── handlers_test.go
│   │   ├── requests.go
│   │   └── views/
│   │       ├── index.templ
│   │       ├── show.templ
│   │       ├── new.templ
│   │       └── edit.templ
│   ├── mail/
│   ├── jobs/
│   ├── router/
│   │   └── routes.go
│   └── db/
│       ├── db.go                 # sqlc-generated
│       └── queries.sql.go        # sqlc-generated
├── queries/
│   └── posts.sql                 # sqlc input
├── migrations/
│   └── 0001_create_users.sql
├── views/
│   └── layouts/
│       └── app.templ
├── assets/
│   ├── css/
│   └── js/
├── .serenity/
│   └── templates/                # project-local template overrides
├── .github/
│   └── workflows/
│       └── deploy.yml
├── Caddyfile
├── Dockerfile
├── docker-compose.yml
├── serenity.toml                 # records Serenity version, stack choices, UI layer
├── THIRD_PARTY_LICENSES.md
├── go.mod
└── README.md
```

The layout is fixed. Generators assume it. Deviations are fine — they just mean some generators won't apply cleanly to the modified project.

## Extensibility: `.serenity/templates/`

Every generator's templates can be overridden on a per-project basis by placing matching files in `.serenity/templates/`. Serenity resolves templates in this order:

1. `<project>/.serenity/templates/<generator>/<file>.tmpl`
2. `~/.serenity/templates/<generator>/<file>.tmpl` (user-global overrides)
3. Built-in templates compiled into the Serenity binary

This solves the stack-evolution problem. When experimenting with a new approach (e.g., switching from chi to stdlib routing) in one project, the developer copies the relevant templates into `.serenity/templates/`, modifies them, and runs generators normally. Other projects continue to use the global defaults. If the experiment succeeds, the modified templates get promoted to the user-global or built-in level.

This also lets FlintCraft client work diverge from internal product work. A FlintCraft project can ship `flint-ui` integration in its local templates. A Firefly Software product can use the default templates.

## Build order and milestones

The smallest valuable cut, in order:

### Milestone 1: `serenity init` (1-2 weekends)
A working bootstrapper for the most common project shape: web app + SQLite + auth + jobs + mail. No customization yet — just the one shape. Validates the template machinery and saves real time on the next new project.

**Done when:** running `serenity init testproject` produces a buildable, deployable project equivalent to what currently takes 4-6 hours of manual setup.

### Milestone 2: `serenity make:resource` (Go + sqlc layer only) (1-2 weekends)
Migration + sqlc query + request struct + handler + route registration. No templ yet. Test on a real new feature in Skalkaho or CairnPost.

**Done when:** adding a new domain entity to an existing Serenity project takes one command and produces working endpoints.

### Milestone 3: templ generation in `make:resource` (1 weekend)
Adds the index/show/new/edit templ views and form partials. Now `make:resource` produces a complete vertical slice.

**Done when:** the generated views render correctly with the project's layout and Tailwind styling, and the htmx form interactions work.

### Milestone 4: `serenity make:job` (a few hours)
Small, high-leverage. Used constantly across projects.

### Milestone 5: `serenity agent:context` (1 weekend)
First agent affordance. Produces a markdown briefing document for Claude Code that accurately describes any Serenity project.

**Done when:** pasting the output into a fresh Claude Code session gives the agent enough context to make sensible architectural decisions without further setup.

### Milestone 6 and beyond
Tier 2 generators as pain dictates: `make:auth`, `make:mailable`, `make:webhook`, then Tier 3 and remaining Tier 4 items.

If Milestones 1-3 are completed, the project is already net-positive in time saved. Everything beyond is incremental gravy.

## Resolved decisions

The following design questions have been resolved during planning:

1. **Repository.** Serenity lives at `github.com/DukeRupert/serenity`. Public.

2. **Distribution.** Serenity ships as a single static binary. Builds are produced by GitHub Actions on tag push and published as release artifacts for the major platforms (macOS arm64/amd64, Linux amd64, Windows amd64). Homebrew tap and scoop bucket are nice-to-have follow-ups; for now `curl | tar` from a release URL is enough. `go install github.com/DukeRupert/serenity/cmd/serenity@latest` works as a fallback for anyone who wants it but is not the primary distribution.

3. **Versioning of templates.** Each generated project includes a `serenity.toml` file recording the Serenity version that produced it. When templates change in a future Serenity release, existing projects keep working unchanged because the generated code is stable. `serenity update:*` commands (when implemented) read this file to know what 3-way merge base to use.

4. **Stack drift handling.** Manual. When the stack itself changes (e.g., adopting a new query library, replacing River with something else), the fixup in existing projects is performed by hand or with project-specific migration scripts. Building a generic `serenity migrate:stack` command is more trouble than it's worth — the changes are rare, project-specific, and benefit from human judgment.

5. **Template testing.** Integration tests run each generator against fixture projects, then compile the output and run the generated tests. CI gate: a generator change cannot merge unless every fixture still builds and passes. This is the only way to avoid silent template rot as the stack evolves.

6. **`flint-ui` integration.** `serenity init` asks during setup which UI component layer to use, with options:
   - `flint-ui` (default) — pulls in the FlintCraft shared component module; templ views generated by `make:resource` use `flint-ui` components.
   - `bare` — plain Tailwind, no shared component module. Useful for non-FlintCraft projects, prototypes, or experiments.
   - `custom` — empty hook for a project-specific component module path.

   The choice is recorded in `serenity.toml` and influences which template variant generators use thereafter. Switching later means editing the file and re-running affected generators (or doing it by hand).

## What success looks like

Six months from now, if Serenity is working:

- Starting a new project takes one command and 30 seconds, instead of an afternoon.
- Adding a new domain entity to an existing project takes one command and a few minutes of customization, instead of an hour of file shuffling.
- Claude Code sessions on Serenity projects start faster and produce better code on the first try, because the project structure is predictable and `agent:context` gives the agent everything it needs.
- Every active project — Skalkaho, Hiri, CairnPost, Wantok, Manifest, the church reservation system, FlintCraft client work — has been touched by Serenity at least once for a new feature.
- The total time invested in Serenity itself is less than the time it has saved.

If those six things are true, it was worth building. If they're not — if the templates calcify, or stack drift outpaces template updates, or agents don't actually do better — the experiment ends and the time invested goes to a different project. That's a fair trade.