import React from 'react'
import { observer } from 'mobx-react'

export default (Component, getStyles) => {
  const ThemedComponent = observer((ownProps, context) => {
    const theme = context.store.theme.theme
    const props = {
      theme,
      prepareStyles: (...styles) => theme.prepareStyles(Object.assign({}, ...styles)),
    }
    if (getStyles) {
      props.styles = getStyles(theme, ownProps)
    }

    return (<Component {...props} {...ownProps}/>)
  })
  ThemedComponent.contextTypes = {store: React.PropTypes.object.isRequired}

  return ThemedComponent
}
