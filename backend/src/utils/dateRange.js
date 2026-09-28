const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

// Builds a `DATE(column) BETWEEN ? AND ?`-style condition from `from`/`to`
// query params (YYYY-MM-DD, inclusive on both ends). Malformed or missing
// values are simply ignored rather than erroring, since this is an optional filter.
function buildDateRangeCondition(column, from, to) {
  const conditions = []
  const params = []

  if (from && DATE_RE.test(from)) {
    conditions.push(`DATE(${column}) >= ?`)
    params.push(from)
  }
  if (to && DATE_RE.test(to)) {
    conditions.push(`DATE(${column}) <= ?`)
    params.push(to)
  }

  return { conditions, params }
}

module.exports = { buildDateRangeCondition }
