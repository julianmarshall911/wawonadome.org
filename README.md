Source code for the [Wassociates website](https://wawonadome.org)

## Development

Firebase config is read from environment variables. Copy `.env.example` to
`.env.local` (git-ignored) and fill in the values from the Firebase console.
Without them the site still runs, but logging in is disabled.

```sh
nub install
nub run dev      # local dev server
nub run test     # unit tests (Vitest)
nub run typecheck
nub run lint     # ESLint
nub run deploy   # build and deploy to Firebase Hosting
```
