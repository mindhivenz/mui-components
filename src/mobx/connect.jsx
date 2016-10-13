import React from 'react'
import { observer } from 'mobx-react'

export default (mapStoreToProps) => (Component) => {
  const Connected = observer((ownProps, context) => {
    return (<Component {...ownProps} {...mapStoreToProps(context.mobxStore, ownProps)} />)
  })
  Connected.contextTypes = {mobxStore: React.PropTypes.object.isRequired}

  return Connected
}
