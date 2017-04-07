import React from 'react'
import MuiMenuItem from 'material-ui/MenuItem'

import { observer } from 'mobx-react'

import withStore from '@mindhive/mobx/withStore'

import { injectStylesSheet } from './components/DrawerStyles'
import MenuLabel from './components/MenuLabel'
import { MenuItemDomain } from './components/MenuItemDomain'

const MenuItem = ({
  onTouchTap,
  icon,
  primaryText,
  active,
  subMenuDomain,
}, {
  domain,
}) =>
  <MuiMenuItem
    primaryText={
      <MenuLabel
        primaryText={primaryText}
        icon={icon}
        onTouchTap={() => { subMenuDomain.hasMenu ? subMenuDomain.onTouchTap() : domain.onItemTouch(onTouchTap) }}
        active={active}
        subMenuDomain={subMenuDomain}
        drawerDomain="domain"
      />
    }
    style={{ height: subMenuDomain.height }}
  />

MenuItem.contextTypes = {
  domain: React.PropTypes.object.isRequired,
}

export default withStore({
  storeClass: MenuItemDomain,
  propName: 'subMenuDomain',
  mapPropsToArgs: ({ menuItems }) => menuItems,
})(
  injectStylesSheet(
    observer(
      MenuItem
    )
  )
)
