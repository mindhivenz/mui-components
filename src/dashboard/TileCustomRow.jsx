import React from 'react'
import DashTile from './DashTile'
import { injectStylesSheet } from './DashboardStyles'
import withOnClick from '../muiUtils/withOnClick'

const TileCustomRow = ({
  children,
  customStyle,
  onClick,

  styles,
  prepareStyles,
}) =>
  children ?
    <div style={prepareStyles(styles.customRow, customStyle)} {...withOnClick(onClick)}>{children}</div>
  :
    null

export default injectStylesSheet(TileCustomRow)
