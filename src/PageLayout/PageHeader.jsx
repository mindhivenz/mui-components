import React from 'react'
import { injectStylesSheet } from './PageLayoutStyles'

const PageHeader = ({
  title,
  description,

  styles: { pageHeader },
  prepareStyles,
}) =>
  <header style={pageHeader.root}>
    <span style={prepareStyles(pageHeader.title)}>{title}</span>
    {description && <span style={prepareStyles(pageHeader.description)}>{description}</span>}
  </header>

export default injectStylesSheet(PageHeader)
