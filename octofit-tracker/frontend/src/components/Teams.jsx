import ResourceTable from './ResourceTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'Description' },
  { key: 'members', label: 'Members', render: team => team.members?.length ?? 0 },
  { key: 'points', label: 'Points' },
]

export default function Teams() {
  return <ResourceTable title="Teams" endpoint={endpoint} columns={columns} />
}