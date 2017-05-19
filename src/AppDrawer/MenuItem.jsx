import React from 'react'
import MuiMenuItem from 'material-ui/MenuItem'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import withStore from '@mindhive/mobx/withStore'

import { injectStylesSheet } from './components/DrawerStyles'
import MenuLabel from './components/MenuLabel'
import MenuItemFlyOut from './components/MenuItemFlyOut'
import { MenuItemDomain } from './components/MenuItemDomain'

const MenuItem = (
  {
    onTouchTap,
    icon,
    primaryText,
    active,
    subMenuDomain,
  }, {
    domain,
  }) => {
  const params = {
    primaryText,
    icon,
    onTouchTap: () => {
      subMenuDomain.hasMenu ? subMenuDomain.onTouchTap() : domain.onItemTouch(onTouchTap)
    },
    active,
    subMenuDomain,
    drawerDomain: domain

  }
  return (
    domain.isFixedWidth ?
      <MenuItemFlyOut {...params} />
      :
      <MuiMenuItem
        primaryText={
          <MenuLabel {...params} />
        }
        style={{ height: subMenuDomain.height }}
      />
  )
}

MenuItem.contextTypes = {
  domain: PropTypes.object.isRequired,
}

export default withStore({
  storeClass: MenuItemDomain,
  propName: 'subMenuDomain',
})(
  injectStylesSheet(
    observer(
      MenuItem
    )
  )
)
