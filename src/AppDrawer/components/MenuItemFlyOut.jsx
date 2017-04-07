import React from 'react'
import MuiMenuItem from 'material-ui/MenuItem'
import withHover from '../../hover/withHover'
import { Icon } from '../../Icon'


import { injectStylesSheet } from './DrawerStyles'

const MenuItemFlyOut = ({
  styles,
  onTouchTap,
  top,
  primaryText,
  cancelHovered,
  icon,
  subMenuDomain,
}) =>
<div>
  <MuiMenuItem
    primaryText={primaryText}
    leftIcon={<Icon style={styles.icon} ligature={icon} />}
    onTouchTap={() => {
      cancelHovered()
      onTouchTap()
    }}
    style={Object.assign({}, styles.menuItemFlyOut.container, { top })}
    innerDivStyle={styles.menuItemFlyOut.inner}
  />
  {subMenuDomain.hasMenu && subMenuDomain.menuItems.map((menuItem, index) => {
    console.log(menuItem)
      return (
        <MuiMenuItem
          primaryText={menuItem.primaryText}
          leftIcon={<Icon style={styles.icon} ligature={menuItem.icon}/>}
          onTouchTap={() => {
            cancelHovered()
            menuItem.onTouchTap()
          }}
          style={Object.assign({},
            styles.menuItemFlyOut.container,
            styles.menuItemFlyOut.subMenu,
            {
              opacity: subMenuDomain.open ? 1 : 0.01,
              top: subMenuDomain.open ? top + ((index + 1) * 48) : top + 48,
              height: subMenuDomain.open ? 48 : 0,
          })}
          innerDivStyle={styles.menuItemFlyOut.inner}
        />
      )
    }
  )}
</div>

export default withHover()(
  injectStylesSheet(MenuItemFlyOut)
)
