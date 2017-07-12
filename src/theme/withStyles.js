//TODO: moved to @mindhive/styles

import React from 'react'
import { computed, observable } from 'mobx'
import { observer } from 'mobx-react'
import { app } from '@mindhive/di'

let deprecatedWarn = false

const copyProps = themeDomain => ({
  theme: themeDomain.muiTheme,
  prepareStyles: themeDomain.prepareStyles,
})

export default (mapThemeToStyles) => {

  if (! deprecatedWarn ) {
    console.warn('"import withStyles from @mindhive/components/withStyles" is deprecated, use "import { withStyles } from @mindhive/styles instead')
    deprecatedWarn = true
  }

  if (! mapThemeToStyles) {
    return Component => {
      const themedComponent = observer(props =>
        React.createElement(Component, { ...props, ...copyProps(app().themeDomain) })
      )
      themedComponent.displayName = 'withStyles'
      return themedComponent
    }
  }

  const mapFuncUsesProps = mapThemeToStyles.length > 1
  if (mapFuncUsesProps) {
    return Component =>
      observer(class extends React.Component {

        static displayName = 'withStyles(props)'

        @computed get themeProps() {
          const { themeDomain } = app()
          return {
            ...copyProps(themeDomain),
            styles: mapThemeToStyles(themeDomain.muiTheme, this.props),
          }
        }

        render() {
          return React.createElement(Component, { ...this.props, ...this.themeProps })
        }
      })
  }

  const cache = observable({
    get themeProps() {
      const { themeDomain } = app()
      return {
        ...copyProps(themeDomain),
        styles: mapThemeToStyles(themeDomain.muiTheme),
      }
    }
  })
  return Component => {
    const themedComponent = observer(props =>
      React.createElement(Component, { ...props, ...cache.themeProps })
    )
    themedComponent.displayName = 'withStyles'
    return themedComponent
  }
}
