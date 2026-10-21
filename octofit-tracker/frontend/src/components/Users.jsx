import ResourceTable from './ResourceTable.jsx'
import { referenceLabel } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Team', render: user => referenceLabel(user.team) },
  { key: 'totalPoints', label: 'Points' },
]

export default function Users() {
  return <ResourceTable title="Users" endpoint={endpoint} columns={columns} />
}