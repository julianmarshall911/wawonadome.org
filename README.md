Source code for the [Wassociates website](https://wawonadome.org)

## Development

Firebase config is read from a `.env` file (not checked in) using the
`REACT_APP_API_KEY`, `REACT_APP_AUTH_DOMAIN`, `REACT_APP_DATABASE_URL`,
`REACT_APP_PROJECT_ID`, `REACT_APP_STORAGE_BUCKET` and
`REACT_APP_MESSAGING_SENDER_ID` variables.

```sh
nub install
nub run dev      # local dev server
nub run test     # unit tests (Vitest)
nub run typecheck
nub run lint     # ESLint
nub run deploy   # build and deploy to Firebase Hosting
```
