# OctoFit Tracker Presentation Tier

React 19, Vite, React Router, and Bootstrap power the activities, leaderboard,
teams, users, and workouts views. The Node.js API must run on port 8000.

## Environment

For Codespaces, `VITE_CODESPACE_NAME` must be defined in
`octofit-tracker/frontend/.env.local` or supplied to the Vite process:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Use the value of the Codespaces `CODESPACE_NAME` environment variable, not a URL.
Vite does not automatically expose `CODESPACE_NAME` to browser code. The app reads
`import.meta.env.VITE_CODESPACE_NAME` and requests
`https://<codespace-name>-8000.app.github.dev/api/<component>/`.
Only public configuration belongs in `VITE_` variables; never put secrets here.
Restart Vite after changing `.env.local`. Production builds capture the value at
build time, so rebuild when it changes.

For local development, leave `VITE_CODESPACE_NAME` unset or blank. Requests safely
fall back to `http://localhost:8000/api/<component>/`.

## Run

From the repository root:

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend -- --host 0.0.0.0 --port 5173 --strictPort
```

In Codespaces, the variable can also be passed directly:

```bash
VITE_CODESPACE_NAME="$CODESPACE_NAME" npm run dev --prefix octofit-tracker/frontend -- --host 0.0.0.0 --port 5173 --strictPort
```

Visit `http://localhost:5173` or the forwarded Codespaces port 5173. Keep API port
8000 accessible to the browser. MongoDB remains private on port 27017.

## API Responses

Each view accepts an array or a paginated object with `results`, `count`, `next`,
and `previous`. Pagination controls follow the API's page links. Loading, empty,
failed requests, and retry states are handled consistently. Populated user/team
references display names, while unpopulated references display their IDs.

```bash
npm run build --prefix octofit-tracker/frontend
npm run lint --prefix octofit-tracker/frontend
```