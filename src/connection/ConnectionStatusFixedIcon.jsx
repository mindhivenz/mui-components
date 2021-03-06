import React from 'react'

import { DEFAULT_SIZE } from './ConnectionStatusAppBarIcon'
import ConnectionStatusIcon from './ConnectionStatusIcon'
import withStyles from '../theme/withStyles'


const ConnectionStatusFixedIcon = ({
  style = {},
  size = DEFAULT_SIZE,
  styles,
  color = styles.defaultColor,
  ...props,
}) =>
  <ConnectionStatusIcon
    style={{
      ...styles.fixedInAppBar,
      ...style,
    }}
    size={size}
    color={color}
    {...props}
  />

const mapThemeToStyles = (
  { appBar, zIndex },
  { size = DEFAULT_SIZE },
) => ({
  defaultColor: appBar.textColor,
  fixedInAppBar: {
    zIndex: zIndex.appBar + 1,
    position: 'fixed',
    top: (appBar.height - size) / 2,
    right: ((appBar.height - size) / 2) * 1.5,  // because the icons tend to be wider than they are high
  },
})

export default withStyles(mapThemeToStyles)(ConnectionStatusFixedIcon)
