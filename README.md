# Signal / Room

A searchable guide to Azure integration, network security, messaging, EDI, supply chain, and IT support.

## Start the app

```sh
pnpm install
pnpm dev
```

## Build the app

```sh
pnpm build
```

## Formatting

Format the project with Oxfmt, or check its format:

```sh
pnpm format
pnpm format:check
```

Topics are grouped by chapter in `src/utils/topics/`. `src/utils/topicCatalog.js` collects them for the app. Chapter names are in `src/utils/chapters.js`. Each topic explains what it means, when and why to use it, gives an example, and includes support notes and source links when available.

The app's interface parts are in `src/components/`. You can filter topics by chapter and search topic text, examples, and support notes. Press `⌘K` or `Ctrl+K` to search. Select a topic to open its details.
