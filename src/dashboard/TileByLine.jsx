import React from 'react'
import DashTile from './DashTile'
import { injectStylesSheet } from './DashboardStyles'

const TileByLine = ({
  children,

  styles,
  prepareStyles,
}) =>
  children ?
    <div style={prepareStyles(styles.byline)}>{children}</div>
  :
    null

export default injectStylesSheet(TileByLine)
