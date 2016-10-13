import React from 'react'
import MuiMenuItem from 'material-ui/MenuItem'

import connect from '../mobx/connect'

import withTheme from '../Theme/withTheme'
import { Icon } from '../Icon'

const MenuItem = ({
  onTouchTap,
  icon,
  theme, // eslint-disable-line no-unused-vars
  prepareStyles, // eslint-disable-line no-unused-vars
  active, // eslint-disable-line no-unused-vars

  styles,
  ...childProps,
}) =>
  <MuiMenuItem
    onTouchTap={onTouchTap}
    leftIcon={<Icon style={styles} ligature={icon}/>}
    style={styles}
    {...childProps}
  />


const calcStyles = ({ drawer }, { active }) => ({
  ...drawer.menuItem,
  ...(active ? drawer.active : {}),
})

const mapStoreToProps = ({
  drawer,
}, {
  onTouchTap,
}) => ({
  onTouchTap: () => {
    if (! drawer.docked) {
      drawer.setOpen(false)
    }
    if (onTouchTap) {
      onTouchTap()
    }
  },
})

export default connect(mapStoreToProps)(
  withTheme(MenuItem, calcStyles)
)
