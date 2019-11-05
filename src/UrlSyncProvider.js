import React from 'react'
import PropTypes from 'prop-types'

import UrlSyncContext from './UrlSyncContext'

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
