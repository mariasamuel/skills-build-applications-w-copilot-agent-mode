import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react'
import { normalizePage } from '../api.js'

export default function ResourceTable({ title, endpoint, columns }) {
  const [url, setUrl] = useState(endpoint)
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState({ loading: true, error: '', page: null })

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        })
        if (!response.ok) throw new Error(`Request failed (HTTP ${response.status}).`)
        const page = normalizePage(await response.json())
        if (!controller.signal.aborted) setState({ loading: false, error: '', page })
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({ loading: false, error: error.message || 'Unable to load records.', page: null })
        }
      }
    }

    load()
    return () => controller.abort()
  }, [url, attempt])

  function refresh() {
    setState({ loading: true, error: '', page: null })
    setAttempt(value => value + 1)
  }

  function changePage(link) {
    setState({ loading: true, error: '', page: null })
    setUrl(new URL(link, url).href)
  }

  const { loading, error, page } = state

  return (
    <section aria-labelledby="resource-title" aria-busy={loading}>
      <div className="resource-heading">
        <div>
          <p className="section-label">OctoFit community</p>
          <h1 id="resource-title">{title}</h1>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary icon-button"
          aria-label={`Refresh ${title.toLowerCase()}`}
          title={`Refresh ${title.toLowerCase()}`}
          disabled={loading}
          onClick={refresh}
        >
          <RefreshCw size={18} aria-hidden="true" />
        </button>
      </div>

      {loading && <p className="status-message" role="status">Loading {title.toLowerCase()}...</p>}
      {error && (
        <div className="alert alert-danger d-flex flex-wrap align-items-center gap-3" role="alert">
          <span>{error}</span>
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={refresh}>
            <RefreshCw size={16} aria-hidden="true" /> Retry
          </button>
        </div>
      )}
      {page && (
        <>
          <p className="record-count" role="status">{page.count} {page.count === 1 ? 'record' : 'records'}</p>
          {page.records.length === 0 ? (
            <p className="status-message">No {title.toLowerCase()} yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle resource-table">
                <caption className="visually-hidden">{title}</caption>
                <thead>
                  <tr>{columns.map(column => <th key={column.key} scope="col">{column.label}</th>)}</tr>
                </thead>
                <tbody>
                  {page.records.map((record, index) => (
                    <tr key={record._id || record.id || index}>
                      {columns.map(column => (
                        <td key={column.key}>{column.render ? column.render(record, index) : (record[column.key] ?? '-')}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {(page.next || page.previous) && (
            <nav className="pagination-controls" aria-label={`${title} pages`}>
              <button type="button" className="btn btn-outline-secondary" disabled={!page.previous} onClick={() => changePage(page.previous)}>
                <ArrowLeft size={16} aria-hidden="true" /> Previous
              </button>
              <button type="button" className="btn btn-outline-secondary" disabled={!page.next} onClick={() => changePage(page.next)}>
                Next <ArrowRight size={16} aria-hidden="true" />
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  )
}