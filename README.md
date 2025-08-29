# Portfolio Website

A modern and responsive **portfolio website** built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).  
This project showcases my work, skills, and experience as a developer, providing an easy way for others to explore my projects and get in touch.

## ✨ Features

- Responsive design, works on all screen sizes
- Smooth navigation with Next.js App Router
- SEO-friendly with metadata configuration
- Project and game showcase section with descriptions and links
- Contact section with direct links (GitHub and LinkedIn)
- Fast performance and optimized assets

## 🚀 Tech Stack

- **Next.js 14** – React framework for production-ready web apps
- **Express** – API for jen-games
- **Tailwind CSS** – Utility-first CSS framework for styling
- **TypeScript** – Type safety and better developer experience
- **ShadCN/UI** – Reusable and accessible components
- **Node.js** - Runtime environment
- **Prisma** - TypeScript-first ORM
- **SQLite** - Database engine
- **Turborepo** - Optimized monorepo build system
- **Netlify** – Deployment and hosting for frontend app
- **Render** – Deployment and hosting for backend app

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

## Database Setup

This project uses SQLite with Prisma.

1. Start the local SQLite database:

```bash
cd apps/server && pnpm db:local
```

2. Update your `.env` file in the `apps/server` directory with the appropriate connection details if needed.

3. Generate the Prisma client and push the schema:

```bash
pnpm db:push
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
jenesh/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   └── server/      # Backend API (Express)
```

## Available Scripts

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications
- `pnpm dev:web`: Start only the web application
- `pnpm dev:server`: Start only the server
- `pnpm check-types`: Check TypeScript types across all apps
- `pnpm db:push`: Push schema changes to database
- `pnpm db:studio`: Open database studio UI
