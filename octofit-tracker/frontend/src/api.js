export function normalizePage(data) {
  if (Array.isArray(data)) {
    return { records: data, count: data.length, next: null, previous: null }
  }

  if (data && Array.isArray(data.results)) {
    return {
      records: data.results,
      count: data.count ?? data.results.length,
      next: data.next || null,
      previous: data.previous || null,
    }
  }

  throw new Error('The API returned an unexpected response.')
}

export function referenceLabel(value) {
  if (value && typeof value === 'object') {
    return value.name || value.username || value.title || value._id || value.id || '-'
  }
  return value ?? '-'
}

export function formatDate(value) {
  if (!value) return '-'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString()
}