import React, { createContext} from 'react'
import PropTypes from 'prop-types'

const UrlSyncContext = createContext({})

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
