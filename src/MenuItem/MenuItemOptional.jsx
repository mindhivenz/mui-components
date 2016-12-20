import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import withTheme from '../theme/withTheme'


const MenuItemOptional = ({
  label = 'None',
  style, // passed by MUI

  theme,

  ...other,
}) =>
  <MenuItem
    value={null}
    primaryText={label}
    label={null}
    style={Object.assign({}, style, { color: theme.palette.disabledColor })}
    {...other}
  />

export default withTheme(MenuItemOptional)
