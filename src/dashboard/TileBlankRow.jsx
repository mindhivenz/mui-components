import React from 'react'
import DashTile from './DashTile'
import { injectStylesSheet } from './DashboardStyles'

const TileBlankRow = ({
  label,
  value,
  onClick,

  styles,
  prepareStyles,
}) =>
  <div
    style={prepareStyles(styles.blankRow)}
    onClick={onClick}
  >
    &nbsp;
  </div>

export default injectStylesSheet(TileBlankRow)
