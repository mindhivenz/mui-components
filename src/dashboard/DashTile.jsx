import React from 'react'
import { injectStylesSheet } from './DashboardStyles'
import withHover from '../hover/withHover'
import withOnClick from '../muiUtils/withOnClick'

const DashTile = ({
  children,
  onClick,

  styles,
  prepareStyles,
}) =>
  <div style={prepareStyles(styles.container)} {...withOnClick(onClick)}>{children}</div>

export default withHover({ mouseLeaveDelay: 0, inline: true })(injectStylesSheet(DashTile))
