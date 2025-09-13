**Project:** Taskly  
**Framework:** Next.js 15.5.2 (created with `create-next-app`)

**Key Libraries & Tools:**

- React 19.1.0
- Clerk (authentication): Provides a complete user authentication and user management solution for React and Next.js apps, including sign-in, sign-up, and user profile management.
- Convex (backend/database): A serverless backend platform that offers real-time database, functions, and storage, making it easy to build full-stack applications without managing infrastructure.
- Radix UI (UI components)
- React Hook Form (form management)
- Tailwind CSS (utility-first styling)
- Zod (schema validation)
- TypeScript (type safety)
- ESLint (code linting)

---

## Project Structure & Folder Usage

This project uses the **App Router** feature of Next.js for routing, located in the `src/app` directory.

- The `src/constants` folder contains constant variables used across the app.
- The `src/hooks` folder is for custom React hooks.
- The `src/lib` folder is for shared libraries and utilities.
  - Utility functions are located at `src/lib/utils`.
- Inside the `src/app` directory, you’ll find folders for each page. Any component inside a subfolder (like `_components`) is local to that page only.
- The `src/components` folder contains global, reusable components available throughout the app.

- The `convex` folder contains convex files and schema .

**Available Scripts:**

- `dev` – Start the development server
- `build` – Build the application
- `start` – Start the production server
- `lint` – Run the linter
- `npm run convex:dev ` – Run the update the functions for convex , you should run this code when you change code at any folders at convex

---

at .env you should have these varablies

from clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWT_ISSUER_DOMAIN=
CLERK_FRONTEND_API_URL=

from convex
NEXT_PUBLIC_CONVEX_URL=

## Environment Variables Setup

### 1. Get Clerk Environment Variables

- Go to your [Clerk dashboard](https://dashboard.clerk.com/).
- Create a new application or select your existing one.
- Find your API keys and URLs:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
  - `CLERK_JWT_ISSUER_DOMAIN`
  - `CLERK_FRONTEND_API_URL`
- Copy these values into your `.env` file.

### 2. Get Convex Environment Variable

- Go to your [Convex dashboard](https://dashboard.convex.dev/).
- Create a new project or select your existing one.
- Find your deployment URL:
  - `NEXT_PUBLIC_CONVEX_URL`
- Copy this value into your `.env` file.

### 3. Link Clerk and Convex Integrate Convex with Clerk

You should follow this documents [convex with clerk](https://clerk.com/docs/integrations/databases/convex).

- In your Convex dashboard, go to the project settings and look for Environment Variables.
- Add your Clerk project's frontend API URL or domain as an allowed origin or integration.
- In your Clerk dashboard, add your Convex deployment URL to the list of allowed origins or redirect URLs if required.
- Make sure both services are using the correct environment variables in your `.env` file.

This will ensure authentication works seamlessly between Clerk and Convex in your app.

---

## Getting Started

To run this app for the first time:

1. **Install dependencies:**

```
npm install
```

2. **Start the Next.js development server:**

```
npm run dev
```

3. **(If using Convex) In a separate terminal, start the Convex dev server:**

```
npm run convex:dev
```

4. **Open your browser and go to** [http://localhost:3000](http://localhost:3000)

If you need to deploy or save Convex functions, use:

- Deploy: `npm run convex:deploy`
- Save functions: `npm run convex:save`
