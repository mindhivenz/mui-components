import React from 'react'
import MuiMenuItem from 'material-ui/MenuItem'
import withHover from '../../hover/withHover'

import { injectStylesSheet } from './DrawerStyles'

const MenuItemFlyOut = ({
  styles,
  onTouchTap,
  top,
  children,
  cancelHovered,
  leftIcon,
}) =>
  <MuiMenuItem
    style={Object.assign({}, styles.menuItemFlyOut.container, { top })}
    innerDivStyle={styles.menuItemFlyOut.inner}
    leftIcon={leftIcon}

    onTouchTap={() => {
      cancelHovered()
      onTouchTap()
    }}
    primaryText={children}
  />

export default withHover()(
  injectStylesSheet(MenuItemFlyOut)
)
