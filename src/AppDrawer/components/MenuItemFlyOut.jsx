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
}) =>
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

export default withHover()(
  injectStylesSheet(MenuItemFlyOut)
)
