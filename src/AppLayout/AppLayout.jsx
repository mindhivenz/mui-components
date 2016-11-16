import React from 'react'
import { observer } from 'mobx-react'

import transitions from 'material-ui/styles/transitions'

import withTheme from '../theme/withTheme'

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
  <div style={prepareStyles(styles.appContainer)}>
    {/* <ConfirmDialog />*/}
    {AppBar}
    <div style={prepareStyles(styles.content)}>
      {/* <ConnectionStatus /> */}
      {children}
    </div>
    {NavDrawer}
  </div>

const calcStylesStyles = (
  {
    spacing,
    app: {
      container,
      content,
    },
    drawer,
  }, {
    navDrawerDomain,
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
    paddingTop: spacing.desktopKeylineIncrement,
    transition: `${transitions.easeOut(null, 'padding-left', null)},
                  ${transitions.easeOut(null, 'width', null)}`,
    paddingLeft: navDrawerDomain.docked ? navDrawerDomain.expanded ? drawer.expandedWidth : drawer.narrowWidth : 0
  },
})


export default withTheme(
  observer(AppLayout),
  calcStylesStyles,
)
