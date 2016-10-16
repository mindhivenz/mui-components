import React from 'react'
import { observer } from 'mobx-react'
import { app } from '@mindhive/di'


export default (Component, getStyles) =>
  observer(ownProps => {
    const themeDomain = app().themeDomain
    const muiTheme = themeDomain.muiTheme
    const props = {
      theme: muiTheme,
      prepareStyles: themeDomain.prepareStyles,
    }
    if (getStyles) {
      props.styles = getStyles(muiTheme, ownProps)
    }
    return <Component {...props} {...ownProps}/>
  })
