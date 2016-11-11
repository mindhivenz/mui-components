import React from 'react'
import DashTile from './DashTile'
import { injectStylesSheet } from './DashboardStyles'

const TileValue = ({
  children,

  styles,
  prepareStyles,
}) =>
  children ?
    <div style={prepareStyles(styles.value)}>{children}</div>
  :
    null

export default injectStylesSheet(TileValue)
