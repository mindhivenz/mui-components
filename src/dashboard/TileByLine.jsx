import React from 'react'
import { injectStylesSheet } from './DashboardStyles'
import TileCustomRow from './TileCustomRow'

const TileByLine = ({
  customStyle = {},
  children,
  styles,
}) =>
  <TileCustomRow customStyle={Object.assign({}, styles.byline, customStyle)}>{children}</TileCustomRow>

export default injectStylesSheet(TileByLine)
