//TODO: moved to @mindhive/documents

import React from 'react'
import IconButton from 'material-ui/IconButton'

import withStyles from '../theme/withStyles'


const DocStatefulIcon = ({
  disabled,
  isOn,
  icon,
  tooltip,

  styles,
}) =>
  <IconButton
    tooltip={(isOn && ! disabled) && tooltip}
    iconStyle={styles}
  >
    {isOn && icon}
  </IconButton>

const mapThemeToStyles = (
  {
    docStatefulIcon: {
      disabledColor: _disabledColor,
    },
  },
  {
    color,
    disabledColor = _disabledColor,
    disabled,
  }) => ({
    color: disabled ? disabledColor : color,
  }
)

export default withStyles(mapThemeToStyles)(DocStatefulIcon)

