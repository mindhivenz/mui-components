import React from 'react'
import { injectStylesSheet } from './DashboardStyles'
import TileCustomRow from './TileCustomRow'

const TileTitle = ({
  children,
  styles,
}) =>
  <TileCustomRow customStyle={styles.title}>{children}</TileCustomRow>

export default injectStylesSheet(TileTitle)
