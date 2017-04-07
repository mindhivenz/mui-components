import React from 'react'
import MuiMenuItem from 'material-ui/MenuItem'
import withHover from '../../hover/withHover'
import { Icon } from '../../Icon'


import { injectStylesSheet } from './DrawerStyles'

const MainMenuItem = withHover()(
  injectStylesSheet(({
  styles,
  onTouchTap,
  top,
  primaryText,
  cancelHovered,
  icon,
  subMenuDomain,
  drawerDomain,
}) =>
  <MuiMenuItem
    primaryText={primaryText}
    leftIcon={<Icon style={styles.icon} ligature={icon} />}
    rightIcon={subMenuDomain.hasMenu && <Icon style={styles.icon} ligature="keyboard_arrow_down" />}
    onTouchTap={() => {
      cancelHovered()
      onTouchTap()
    }}
    style={Object.assign({}, styles.menuItemFlyOut.container, { top })}
    innerDivStyle={styles.menuItemFlyOut.inner}
  />
  ))


const SubMenuItem = withHover()(
  injectStylesSheet(({
    index,
    menuItem,
    subMenuDomain,
    drawerDomain,
    styles,
    top,
  }) =>
    <MuiMenuItem
      primaryText={menuItem.primaryText}
      leftIcon={<Icon style={styles.subIcon(menuItem.active)} ligature={menuItem.icon}/>}
      onTouchTap={() => {
        // cancelHovered()
        drawerDomain.onItemTouch(menuItem.onTouchTap)
      }}
      style={Object.assign({},
        styles.menuItemFlyOut.container,
        styles.menuItemFlyOut.subMenu,
        {
          zIndex: subMenuDomain.open ? 1390 : -1,
          opacity: subMenuDomain.open ? 1 : 0.01,
          top: subMenuDomain.open ? top + ((index + 1) * 48) : top + 48,
          height: subMenuDomain.open ? 48 : 0,
        })}
      innerDivStyle={styles.menuItemFlyOut.inner}
    />))


const MenuItemFlyOut = ({
  subMenuDomain,
  ...other
}) =>
<div>
  <MainMenuItem
    subMenuDomain={subMenuDomain}
    {...other}
  />

  {subMenuDomain.hasMenu && subMenuDomain.menuItems.map((menuItem, index) => {
      return (
        <SubMenuItem
          index={index}
          menuItem={menuItem}
          subMenuDomain={subMenuDomain}
          {...other}
        />
      )
    }
  )}
</div>

export default MenuItemFlyOut
