import { useCallback, useEffect, useRef, useState } from 'react'
import queryString from 'query-string'
import Factory from 'type-casting'

export const parse = (params) => queryString.parse(params, { arrayFormat: 'comma' })

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

    if (onUpdate) {
      const params = cast(onUpdate())
      setCurrentParams(params)
    }
  }, dependencies)

  useEffect(() => {
    if (!currentParams) return
    onHistoryReplace(queryString.stringify(currentParams, { arrayFormat: 'comma' }))
  }, [currentParams])

  return currentParams
} 

export default useUrlSync
