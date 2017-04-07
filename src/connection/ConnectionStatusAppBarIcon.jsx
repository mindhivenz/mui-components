import React from 'react'

import ConnectionStatusIcon from './ConnectionStatusIcon'
import withStyles from '../theme/withStyles'


export const DEFAULT_SIZE = 32

const ConnectionStatusFixedIcon = ({
  style = {},
  size = DEFAULT_SIZE,
  styles,
  color = styles.defaultColor,
  ...props,
}) =>
  <ConnectionStatusIcon
    style={{
      ...styles.appBarPositioning,
      ...style,
    }}
    size={size}
    color={color}
    {...props}
  />

const mapThemeToStyles = (
  { appBar, spacing },
  { size = DEFAULT_SIZE },
) => ({
  defaultColor: appBar.textColor,
  appBarPositioning: {
    paddingTop: ((appBar.height - DEFAULT_SIZE) / 2) - 8,
    paddingRight: spacing.desktopGutter,
  },
})

export default withStyles(mapThemeToStyles)(ConnectionStatusFixedIcon)
