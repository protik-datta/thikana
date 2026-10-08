import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PROPERTIES } from '@/data/properties'
import { applyFilters, filtersToParams, getActiveChips, parseFilters, sortProperties } from '@/utils/propertyFilters'

export function usePropertyFilters(fixedTransaction) {
  const [params, setParams] = useSearchParams()

  const filters = useMemo(() => parseFilters(params, fixedTransaction), [params, fixedTransaction])

  const results = useMemo(
    () => sortProperties(applyFilters(PROPERTIES, filters), filters.sort),
    [filters],
  )

  const chips = useMemo(() => getActiveChips(filters, fixedTransaction), [filters, fixedTransaction])

  const update = useCallback(
    (patch) => {
      const next = { ...filters, ...patch }
      if (patch.transaction !== undefined && patch.transaction !== filters.transaction) {
        next.minPrice = null
        next.maxPrice = null
      }
      setParams(filtersToParams(next, fixedTransaction), { replace: true })
    },
    [filters, fixedTransaction, setParams],
  )

  const reset = useCallback(() => {
    setParams(filtersToParams({ ...parseFilters(new URLSearchParams(), fixedTransaction), sort: filters.sort }, fixedTransaction), {
      replace: true,
    })
  }, [filters.sort, fixedTransaction, setParams])

  return { filters, results, chips, update, reset, signature: params.toString() }
}
