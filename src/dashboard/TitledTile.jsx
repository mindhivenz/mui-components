import React from 'react'
import DashTile from './DashTile'
import { injectStylesSheet } from './DashboardStyles'
import Value from './TileValue'
import Title from './TileTitle'
import ByLine from './TileByLine'

const TitledTile = ({
  value,
  title,
  byline,
  children,
  style,

  styles,
  prepareStyles,
}) =>
  <DashTile style={style}>
    <Value style={style}>{value}</Value>
    <Title style={style}>{title}</Title>
    <ByLine style={style}>{byline}</ByLine>
    {children && <div style={prepareStyles(styles.content)}>{children}</div>}
  </DashTile>

export default injectStylesSheet(TitledTile)
