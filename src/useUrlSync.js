import { useCallback, useContext, useMemo } from 'react'
import { useLocation } from 'react-router'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import Factory from 'type-casting'

import UrlSyncContext from './UrlSyncContext'

const useUrlSync = () => {
  const { types } = useContext(UrlSyncContext)

  const history = useHistory()
  const location = useLocation()  

  const values = useMemo(() => Factory(types).cast(queryString.parse(location.search)), [types, location.search])

  const urlNext = useCallback((valuesNext) => {
    return `${location.pathname}?${queryString.stringify(Factory(types).cast(valuesNext))}${location.hash}`
  }, [types, location])

  const change = (key, value) => {
    const valuesNext = {...values}
    valuesNext[key] = value
    history.replace(urlNext(valuesNext))
  }

  const changeAll = (valuesNext) => {
    history.replace(urlNext(valuesNext))
  }

  const toggle = (key, value) => {
    const type = types[key]
    if (!type) return

    const castValue = type.cast(value)
    if (Array.isArray(castValue)){
      const [castItem] = castValue
      const valuesNext = [...values[key]]
      const index = valuesNext.indexOf(castItem)

      if(index < 0) valuesNext.push(castItem)
      else valuesNext.splice(index, 1)

      change(key, valuesNext)
    }
  }

  return {
    change,
    changeAll,
    toggle,
    values,
  }
}

export default useUrlSync
