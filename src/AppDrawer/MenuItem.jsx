import React from 'react'
import MuiMenuItem from 'material-ui/MenuItem'

import withStore from '@mindhive/mobx/withStore'

import { injectStylesSheet } from './components/DrawerStyles'
import MenuLabel from './components/MenuLabel'
import { MenuItemDomain } from './components/MenuItemDomain'

const MenuItem = ({
  onTouchTap,
  icon,
  primaryText,
  active,
  menuItems = [],
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
        menuItems={menuItems}
      />
    }
    style={{ height: 48 + (menuItems.length * 48) }}
  />

MenuItem.contextTypes = {
  domain: React.PropTypes.object.isRequired,
}

export default withStore({
  storeClass: MenuItemDomain,
  propName: 'subMenuDomain',
  mapPropsToArgs: ({ users }) => users,
})(
  injectStylesSheet(MenuItem)
)
