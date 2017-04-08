import React from 'react'
import PropTypes from 'prop-types'

import MuiDrawer from 'material-ui/Drawer'

import { injectStylesSheet } from './DrawerStyles'
import ToggleExpandDrawer from './ToggleExpandDrawer'

const Container = ({
  styles,
  children,
}, {
  domain,
}) =>
  <nav style={styles.nav}>
    <MuiDrawer
      containerStyle={styles.drawer}
      docked={domain.docked}
      open={domain.open}
      onRequestChange={domain.setWantOpen}
    >
      {children}
      {domain.canFlyOut &&
      <ToggleExpandDrawer />
      }
    </MuiDrawer>
  </nav>

Container.contextTypes = {
  domain: PropTypes.object.isRequired,
}

export default injectStylesSheet(Container)
