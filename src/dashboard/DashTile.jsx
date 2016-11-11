import React from 'react'
import { injectStylesSheet } from './DashboardStyles'

const DashTile = ({
  children,
  onClick,

  styles,
  prepareStyles,
}) =>
  <div style={prepareStyles(styles.container)} onClick={onClick}>
    {children}
  </div>

export default injectStylesSheet(DashTile)
