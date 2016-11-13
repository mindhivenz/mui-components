import React from 'react'
import { injectStylesSheet } from './DashboardStyles'
import TileCustomRow from './TileCustomRow'

const TileValue = ({
  children,
  styles,
}) =>
  <TileCustomRow customStyle={styles.value}>{children}</TileCustomRow>

export default injectStylesSheet(TileValue)
