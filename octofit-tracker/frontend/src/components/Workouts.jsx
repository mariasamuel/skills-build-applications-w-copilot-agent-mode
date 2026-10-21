import ResourceTable from './ResourceTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'description', label: 'Description' },
  { key: 'activityType', label: 'Activity' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Minutes' },
]

export default function Workouts() {
  return <ResourceTable title="Workouts" endpoint={endpoint} columns={columns} />
}