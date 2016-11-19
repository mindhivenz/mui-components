import React from 'react'
import MuiMenuItem from 'material-ui/MenuItem'

import IconButton from 'material-ui/IconButton'
import { LastPage } from '../../Icon'

import { injectStylesSheet } from './DrawerStyles'

const ToggleExpandDrawer = ({
  styles,
}, {
  domain,
}) =>
  <MuiMenuItem
    style={styles.rowItem}
    onTouchTap={domain.toggleExpand}
    primaryText={
      <IconButton style={styles.expandedBtn}>
        <LastPage color={styles.expandedIcon.color} />
      </IconButton>
    }
  />

ToggleExpandDrawer.contextTypes = {
  domain: React.PropTypes.object.isRequired,
}

export default injectStylesSheet(ToggleExpandDrawer)
