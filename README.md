# Quizzer - Full-stack Quiz Application

A full-stack quiz application built with Hono (backend) and Next.js + TailwindCSS (frontend), demonstrating end-to-end functionality with type-safe validation.

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 10.20.0+

### Installation

```bash
# Install dependencies for all packages
pnpm install
```

### Development

```bash
# Run both API and web app in parallel
pnpm dev

# Or run individually:
pnpm dev:api    # Runs API on http://localhost:8787
pnpm dev:web    # Runs Next.js app on http://localhost:3000
```

### Build

```bash
# Build all packages
pnpm build

# Build individually:
pnpm --filter api build
pnpm --filter web build
```

### Clean

```bash
# Remove build artifacts
pnpm clean
```

## Architecture Notes

### Node vs Edge Runtime

The backend is configured to run on Cloudflare Workers (using wrangler for deployment), which means it runs on Cloudflare's edge network. Since Hono was required, it works out well because Hono is built for this environment - it's lightweight and performs great with Workers. It's similar to Express if you've used that, but optimized for edge computing.

The frontend uses Next.js with the App Router as required. It runs on Node.js for server-side rendering, but also works in the browser for client-side interactions. This hybrid approach gives you fast initial loads from the server and interactive features on the client.

### Monorepo Structure

The project is organized as a monorepo with pnpm workspaces. Here's the basic structure:

```
quizzer/
├── apps/
│   ├── api/          # Hono API (Cloudflare Workers)
│   └── web/          # Next.js frontend
├── packages/
│   └── shared/       # Shared schemas and types (Zod)
└── pnpm-workspace.yaml
```

This setup lets me share types and schemas between the frontend and backend through the shared package. Everything stays in sync, which means better type safety across the entire stack and one less thing to worry about when refactoring.

## Validation Approach

I put all the Zod schemas in the shared package so both the frontend and backend use the exact same validation rules. This way everything stays in sync - if the API changes what it expects, TypeScript will catch it on the frontend too.

On the backend, incoming requests get validated with `GradeRequestSchema`, and outgoing responses get validated with `QuizSchema` and `GradeResponseSchema`. If something's wrong, it returns a 400 for bad requests or 500 for server errors.

The frontend also validates everything before using it. API responses get checked against the schemas, and answers get validated before being sent to the API. Since the TypeScript types are inferred from the Zod schemas, you get type safety at compile time too.

The flow is pretty straightforward: request comes in, Zod validates it, business logic runs, response gets validated, then sent to the client. If validation fails anywhere, it returns the appropriate error code.

## Libraries Used and Rationale

I used Zod in the shared package for validation. It gives you type-safe schemas, runtime validation, and TypeScript type inference all in one. It's the standard choice for this kind of thing.

For the frontend, I added TanStack Query for data fetching. It handles all the caching, refetching, and state management automatically. Instead of writing manual fetch logic with useState and useEffect, you just use hooks and it handles everything - loading states, errors, caching, the whole deal.

For the UI, I went with Shadcn UI. It's a collection of really solid React components built on Radix UI, so they're accessible out of the box. They're fully customizable with Tailwind, and since they're copy-paste components rather than a package dependency, you have full control over the code.

## Trade-offs and Shortcuts Taken

What I got right: TypeScript and Zod validation throughout the entire stack, components organized in a way that makes sense, proper error handling with messages users can actually understand, and clean separation between routes, services, and utilities.

What I took shortcuts on: The questions are just hardcoded in a file since we're using mock data only. Answers are only stored in client state, so if someone refreshes the page, they lose their progress. And for text answers, I'm just doing a simple case-insensitive string match - no fuzzy matching or handling synonyms. So "4" won't match "four", it has to be exact.

No testing was implemented for either the UI or API. I tested everything manually, but there are no unit tests, integration tests, or E2E tests.

For CI/CD, Vercel automatically builds and deploys the frontend on every push to the main branch. The API doesn't have any automation set up - deployments are done manually with `pnpm deploy` from the api directory. Cloudflare Workers does support GitHub Actions for automation, but it's not configured here.

## Honest Time Spent

I spent about 4-5 hours total on this. Here's roughly how it broke down:

Setup and getting the monorepo structure right took maybe 30 minutes. Designing the Zod schemas and making sure types would work across both apps was another 20 minutes or so.

The backend took about an hour - setting up the Hono routes, writing the grading logic, adding validation, and organizing the code properly.

Frontend implementation was probably an hour and a half. Building out all the quiz components, handling different question types, form state management, showing results, and adding loading and error states.

Adding TanStack Query took around 30 minutes - setting up the provider and converting everything to use hooks.

Making it look decent with Shadcn components and getting the styling right was another 30 minutes.

Then I spent maybe 30 minutes refactoring - breaking down large components, creating the custom hook, and cleaning up code.

Testing everything and fixing TypeScript errors was about 20 minutes, and writing this README took maybe 10 minutes.
