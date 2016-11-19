import React from 'react'
import { injectStylesSheet } from './DrawerStyles'

const ExpandVisible = ({
  // used in styles
  hideWhenExpanded, // eslint-disable-line no-unused-vars
  hideWhenNarrow,  // eslint-disable-line no-unused-vars
  // --

  style,
  styles,
  prepareStyles,
  children,
}) =>
  <div style={prepareStyles(styles.expandVisible, style)}>
    {children}
  </div>

export default injectStylesSheet(ExpandVisible)
