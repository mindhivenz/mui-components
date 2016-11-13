import React from 'react'
import DashTile from './DashTile'
import { injectStylesSheet } from './DashboardStyles'
import withOnClick from '../muiUtils/withOnClick'

const TileBlankRow = ({
  onClick,

  styles,
  prepareStyles,
}) =>
  <div style={prepareStyles(styles.blankRow)} {...withOnClick(onClick)}>&nbsp;</div>

export default injectStylesSheet(TileBlankRow)
