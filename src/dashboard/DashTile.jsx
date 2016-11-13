import React from 'react'
import { injectStylesSheet } from './DashboardStyles'
import withHover from '../hover/withHover'

const DashTile = ({
  children,
  onClick,

  styles,
  prepareStyles,
}) => {
  const attributes = {}
  if (onClick) {
    attributes.onClick = onClick
  }
  return (
    <div style={prepareStyles(styles.container)} {...attributes}>
      {children}
    </div>
  )
}

export default withHover({ mouseLeaveDelay: 0, inline: true })(injectStylesSheet(DashTile))
