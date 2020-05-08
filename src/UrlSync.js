import { useCallback, useEffect, useRef, useState } from 'react'
import queryString from 'query-string'
import Factory from 'type-casting'

const QUERY_PARSER_OPTIONS = { arrayFormat: 'comma' }

export const parse = (params) => queryString.parse(params, QUERY_PARSER_OPTIONS)

export const stringify = (params) => queryString.stringify(params, QUERY_PARSER_OPTIONS)

const useUrlSync = (
  {
    onHistoryReplace,
    onUpdate,
    types,
  },
  dependencies,
) => {
  if (!onHistoryReplace) throw new Error(`Missing 'onHistoryReplace' prop`)
  if (!onUpdate) throw new Error(`Missing 'onUpdate' prop`)

  const isInitialEffect = useRef(true)

  const cast = useCallback((nextParams) => {
    if (typeof nextParams === 'string') return cast(parse(nextParams))
    if (!types) return nextParams
    return Factory(types).cast(nextParams)
  }, [types])

  const [currentParams, setCurrentParams] = useState(() => {
    if (!onUpdate) return {}
    return cast(onUpdate())
  })

  useEffect(() => {
    if (isInitialEffect.current) {
      isInitialEffect.current = false
      return
    }

    // Order of keys will be same
    const compareObjects = (a, b) => JSON.stringify(a) === JSON.stringify(b)

    if (onUpdate) {
      const nextParams = cast(onUpdate())
      if (!compareObjects(currentParams, nextParams)) setCurrentParams(nextParams)
    }
  }, dependencies)

  useEffect(() => {
    if (!currentParams) return
    onHistoryReplace(stringify(currentParams))
  }, [currentParams])

  return currentParams
} 

export default useUrlSync
