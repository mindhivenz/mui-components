import React from 'react'
import DashTile from './DashTile'
import { injectStylesSheet } from './DashboardStyles'
import withOnClick from '../muiUtils/withOnClick'

const TileDataRow = ({
  label,
  value,
  onClick,

  styles,
  prepareStyles,
}) =>
  <div
    style={prepareStyles(styles.dataRow)}
    {...withOnClick(onClick)}
  >
    <span style={prepareStyles(styles.dataRowLabel)}>{label}</span>
    <span style={prepareStyles(styles.dataRowValue)}>{value}</span>
  </div>

export default injectStylesSheet(TileDataRow)
