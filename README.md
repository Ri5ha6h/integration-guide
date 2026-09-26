# Signal / Room

A searchable field guide to Azure integration, security and networking, messaging patterns, and ITSM support operations.

## Start the app

```sh
pnpm install
pnpm dev
```

## Build for production

```sh
pnpm build
```

The concept library lives in `src/data.js`. Each entry includes a plain-language definition, purpose, common use, reason to use it, and an operations note. The React interface groups those entries into four chapters and supports filtering, full-text search, keyboard search (`⌘K` / `Ctrl+K`), and concept detail panels.
