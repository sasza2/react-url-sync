import React, { createContext, useCallback, useContext, useMemo} from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router'
import queryString from 'query-string'
import Factory from 'type-casting'

const UrlSyncContext = createContext({})

export const useUrlSync = () => {
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

  return {
    change,
    changeAll,
    values,
  }
}

const UrlSyncProvider = (props) => {
  const types = {
    ...props
  }
  delete types.children

  return (
    <UrlSyncContext.Provider value={{ types }}>
      {props.children}
    </UrlSyncContext.Provider>
  )
}

UrlSyncProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UrlSyncProvider
