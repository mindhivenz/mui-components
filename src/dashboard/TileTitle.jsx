import React from 'react'
import DashTile from './DashTile'
import { injectStylesSheet } from './DashboardStyles'

const TileTitle = ({
  children,

  styles,
  prepareStyles,
}) =>
  children ?
    <div style={prepareStyles(styles.title)}>{children}</div>
  :
    null

export default injectStylesSheet(TileTitle)
