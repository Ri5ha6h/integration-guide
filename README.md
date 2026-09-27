# Signal / Room

A searchable field guide to Azure integration, security and networking, messaging patterns, EDI, and ITSM support operations.

## Start the app

```sh
pnpm install
pnpm dev
```

## Build for production

```sh
pnpm build
```

The guide is organized by chapter under `src/utils/topics/`; `src/utils/topicCatalog.js` brings the entries together for the interface. Shared chapter metadata lives in `src/utils/chapters.js`. Each topic explains what it is, why and where it is used, includes a practical example, and adds operational guidance and primary references where applicable.

The UI is split into focused components under `src/components/`. The app supports chapter filters, full-text search (including examples and operations notes), keyboard search (`⌘K` / `Ctrl+K`), and accessible concept detail panels.
