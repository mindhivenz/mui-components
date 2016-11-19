import React from 'react'
import MuiMenuItem from 'material-ui/MenuItem'
import { Icon } from '../Icon'
import withHover from '../hover/withHover'

import { injectStylesSheet } from './components/DrawerStyles'
import MenuLabel from './components/MenuLabel'

const MenuItem = ({
  onTouchTap,
  icon,
  styles,
  primaryText,

  hovered,
  cancelHovered,
  setHovered,
  active,
}, {
  domain,
}) => {
  const performMenuAction = () => {
    cancelHovered()
    domain.onItemTouch(onTouchTap)
  }
  return (
    <MuiMenuItem
      style={styles.menuItem}
      onTouchTap={performMenuAction}
      leftIcon={<Icon style={styles.icon} ligature={icon} />}
      primaryText={
        <MenuLabel
          onHover={setHovered}
          leftIcon={<Icon style={styles.icon} ligature={icon} />}
          onTouchTap={performMenuAction}
          hovered={hovered}
          active={active}
        >
          { primaryText }
        </MenuLabel>
      }
    />
  )
}

MenuItem.contextTypes = {
  domain: React.PropTypes.object.isRequired,
}

export default withHover()(
  injectStylesSheet(MenuItem)
)
