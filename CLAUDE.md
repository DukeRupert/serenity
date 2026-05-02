# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repository is in the planning phase. The only substantive content is `framework-plan.md`, which is the authoritative design document. There is no Go code, `go.mod`, build pipeline, or test suite yet. Do not invent commands or claim they work — there is nothing to build until Milestone 1 begins.

When implementation starts, read `framework-plan.md` end-to-end before proposing structure. The "Build order and milestones" section dictates what to build first; do not jump ahead to later tiers.

## What Serenity is (and isn't)

Serenity is a **development-time CLI code generator** for Logan's Go web stack. It is *not* a runtime framework — generated projects must not import a `serenity` package. The generated code *is* the application; once a project is generated, Serenity has no further role at runtime.

Concretely:
- No service container, facades, ORM, reflection-based dispatch, or string-key dynamic config.
- No runtime library shipped alongside the CLI.
- Templates produce plain, readable Go that the developer owns and edits directly.

## Non-negotiable design principles

These come from `framework-plan.md` § "Design principles". Anything that violates them gets cut, even if convenient:

1. **Templates, not magic.** Every generator is a Go template + small driver. No metaprogramming.
2. **Generated code is the developer's code.** No back-references to Serenity at runtime.
3. **Conventions, not configuration.** Project layout (see plan § "Project layout") is fixed. Don't add config knobs to make layout flexible.
4. **Compile-time over runtime.** sqlc, templ, and Serenity all generate code; the deployed binary contains zero reflection-based dispatch.
5. **Single binary, embedded assets.** Generated projects embed migrations, views, and static assets via `embed.FS`.
6. **Idempotent and updatable.** Re-running a generator must never silently destroy hand edits — either error clearly or 3-way merge.
7. **Agent-legible by construction.** Project structure and naming are designed to be machine-readable. Tier 4 `agent:*` commands are first-class, not an afterthought.

## The encoded stack

Generators assume this stack — don't introduce alternatives without a corresponding update to `framework-plan.md`:

- **Routing:** stdlib `net/http.ServeMux` (Go 1.22+ method-based routing). Not chi.
- **Views:** templ. **Interactivity:** htmx + Alpine.js. **Styles:** Tailwind (with optional `flint-ui` shared components).
- **DB:** SQLite or Postgres, via **sqlc** queries and **goose** migrations.
- **Jobs:** River for Postgres, goqite for SQLite — both behind a `jobs.Queue` interface so generated job code is portable.
- **Mail:** pluggable `mailer.Mailer` interface; Postmark default.
- **Errors:** Sentry. **Health:** `/healthz`. **Metrics:** Prometheus `/metrics` with **route-pattern labels** (e.g. `/posts/{id}`), never raw paths.
- **Deploy:** Hetzner VPS + Caddy + Docker Compose + GitHub Actions. No cloud coupling.

The plan's "Stack rationale" section explains *why* for each non-obvious choice (River's MPL-2.0 licensing, stdlib ServeMux over chi, Sentry over Bugsink, etc.). Read it before suggesting a swap.

## Generator surface (from the plan)

Generators are tiered by frequency of use. When implementing:

- **Tier 1 (weekly):** `serenity init`, `make:resource`, `make:page`, `make:job` — build these first.
- **Tier 2 (monthly):** `make:component`, `make:migration`, `make:auth`, `make:mailable`, `make:webhook`.
- **Tier 3 (occasional):** `make:admin`, `make:client`, `make:cli`, `make:cron`.
- **Tier 4 (agent affordances):** `agent:context`, `agent:check`, `agent:diff` — interleave early; this is the differentiating layer.

`make:resource <Name>` is the marquee feature: it produces a complete CRUD vertical slice (migration, sqlc query, request struct, handlers, route registration, templ views, htmx form partials, test scaffold). Variants: `--api` (JSON-only), `--minimal` (read-only).

## Template overrides

Per the plan § "Extensibility", templates resolve in this order:
1. `<project>/.serenity/templates/<generator>/<file>.tmpl`
2. `~/.serenity/templates/<generator>/<file>.tmpl`
3. Built-in templates compiled into the Serenity binary

Preserve this lookup order in any template-loading code. It's the mechanism for stack drift and FlintCraft vs. internal-product divergence.

## Project metadata

Each generated project gets a `serenity.toml` recording the Serenity version, stack choices, and UI component layer (`flint-ui` / `bare` / `custom`). Future `serenity update:*` commands rely on this file to know the 3-way merge base — don't omit it.
