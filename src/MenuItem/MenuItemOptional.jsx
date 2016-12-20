import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import withTheme from '../theme/withTheme'


const MenuItemOptional = ({
  label = 'None',

  theme,
}) =>
  <MenuItem
    value={null}
    primaryText={label}
    label={null}
    style={{ color: theme.palette.disabledColor }}
  />

export default withTheme(MenuItemOptional)
