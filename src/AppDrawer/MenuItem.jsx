import React from 'react'
import MuiMenuItem from 'material-ui/MenuItem'

import { injectStylesSheet } from './components/DrawerStyles'
import MenuLabel from './components/MenuLabel'

const MenuItem = ({
  onTouchTap,
  icon,
  primaryText,
  active,
}, {
  domain,
}) =>
  <MuiMenuItem
    primaryText={
      <MenuLabel
        primaryText={primaryText}
        icon={icon}
        onTouchTap={() => { domain.onItemTouch(onTouchTap) }}
        active={active}
      />
    }
  />

MenuItem.contextTypes = {
  domain: React.PropTypes.object.isRequired,
}

export default injectStylesSheet(MenuItem)
