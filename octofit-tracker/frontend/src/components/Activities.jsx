import ResourceTable from './ResourceTable.jsx'
import { formatDate, referenceLabel } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

const columns = [
  { key: 'user', label: 'Member', render: activity => referenceLabel(activity.user) },
  { key: 'type', label: 'Activity' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'distanceKm', label: 'Distance (km)' },
  { key: 'points', label: 'Points' },
  { key: 'date', label: 'Date', render: activity => formatDate(activity.date) },
]

export default function Activities() {
  return <ResourceTable title="Activities" endpoint={endpoint} columns={columns} />
}