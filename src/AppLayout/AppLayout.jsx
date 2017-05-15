import React from 'react'
import { observer } from 'mobx-react'

import transitions from 'material-ui/styles/transitions'

import withStyles from '../theme/withStyles'

// import ViewerControl from '../viewer/ViewerControl'

// import ConfirmDialog from '../../client/confirm/ConfirmDialog'


const AppLayout = (
  {
    AppBar,
    NavDrawer,
    children,
    prepareStyles,
    styles,
  }
) =>
  <div id="AppLayout.appContainer" style={prepareStyles(styles.appContainer)}>
    {/* <ConfirmDialog />*/}
    {AppBar}
    <div id="AppLayout.content" style={prepareStyles(styles.content)}>
      {/* <ConnectionStatus /> */}
      {children}
    </div>
    {NavDrawer}
  </div>

const mapThemeToStyles = (
  {
    spacing,
    app: {
      container,
      content,
    },
    drawer,
  }, {
    layoutDomain,
  },
) => ({
  appContainer: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    margin: '0 auto',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',

    color: container.color,
    backgroundColor: container.backgroundColor,

  },
  content: {
    position: 'fixed',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    paddingTop: layoutDomain.topOffset,
    transition: `${transitions.easeOut(null, 'padding-left', null)},
                  ${transitions.easeOut(null, 'width', null)}`,
    paddingLeft: layoutDomain.leftOffset
  },
})


export default
  withStyles(mapThemeToStyles)(
    observer(AppLayout)
  )
