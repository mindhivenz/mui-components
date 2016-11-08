import React from 'react'
import IconButton from 'material-ui/IconButton'

import withStyleSheet from '@mindhive/components/withStyleSheet'


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

export default withStyleSheet(mapThemeToStyles)(DocStatefulIcon)

