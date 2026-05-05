# Cocktail Explorer

Small React app using TheCocktailDB API:
https://www.thecocktaildb.com/api.php

## Demo

https://cocktail-explorer-app.vercel.app/

## Features

- Search cocktails by name (loading / empty / error states)
- Randomiser: show 3 random cocktails, then “See more (+3)”
- Cocktail detail view:
   - name, image
   - ingredients + measurements
   - instructions

## Tests

- Unit test for `getIngredients` mapper (`vitest`)

## Tech

- React + TypeScript + Vite
- React Router
- CSS Modules
- Vitest (unit tests)

## Setup

Requirements: Node.js + npm

```bash
npm i
npm run dev
```

Open the app at the URL printed in the terminal.

## Build

```bash
npm run build
npm run preview
```

## Lint

```bash
npm run lint
```

## Accessibility

- Form inputs have associated labels
- Keyboard-friendly navigation with visible focus styles
- Clear loading, empty, and error states

## AI Tools Note

I used Codex CLI as a support tool during development to plan the work into smaller steps, discuss approaches, validate API usage and data handling, and quickly spot small syntax/typing mistakes.

It also helped review UX and accessibility details (loading/empty/error states, keyboard focus). I evaluated the additional suggestions and applied them where appropriate.

All code, implementation decisions, and final adjustments were made and reviewed by me.
