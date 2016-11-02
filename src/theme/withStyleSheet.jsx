import React from 'react'
import { observer } from 'mobx-react'
import { app } from '@mindhive/di'


export default (themeToStyles) =>
  (Component) =>
    observer((ownProps) => {
      const themeDomain = app().themeDomain
      const muiTheme = themeDomain.muiTheme
      const props = {
        theme: muiTheme,
        prepareStyles: themeDomain.prepareStyles,
      }
      if (themeToStyles) {
        props.styles = themeToStyles(muiTheme, ownProps)
      }
      return <Component {...props} {...ownProps} />
    })
