import ResourceTable from './ResourceTable.jsx'
import { referenceLabel } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'Member', render: entry => referenceLabel(entry.user) },
  { key: 'team', label: 'Team', render: entry => referenceLabel(entry.team) },
  { key: 'points', label: 'Points' },
]

export default function Leaderboard() {
  return <ResourceTable title="Leaderboard" endpoint={endpoint} columns={columns} />
}