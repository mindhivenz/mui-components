import React from 'react'
import MuiDrawer from 'material-ui/Drawer'
import { connect } from 'react-redux'

import { withTheme } from '@mindhive/ui-tools'
import { Version } from '../Version'

import { setNavDrawerOpenAction } from './navDrawerActions'

const Drawer = ({
  open,
  docked,
  styles,
  setNavDrawerOpen,
  children,
}) =>
  <nav style={styles.nav}>
    <MuiDrawer
      containerStyle={styles.drawer}
      docked={docked}
      open={open}
      onRequestChange={setNavDrawerOpen}
    >
      {children}
      <Version />
    </MuiDrawer>
  </nav>

const Themed = withTheme(Drawer, (
    {
      appBar,
      drawer,
      fillParent,
    },
    { docked },
  ) => (
  {
    // nav: fillParent,
    drawer: {
      backgroundColor: drawer.color,
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      height: `calc(100% - ${docked ? appBar.height : 0}px)`,
      marginTop: docked ? appBar.height : 0,
    },
  })
)


const mapStateToProps = ({
  navDrawer: { open, docked },
}) => ({
  open,
  docked,
  setNavDrawerOpen: setNavDrawerOpenAction,
})

export default connect(mapStateToProps)(Themed)
