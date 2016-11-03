import React from 'react'

import { applyStyleSheet } from './PageLayoutStyles'

const PageLayout = ({
  title,
  description,
  children,

  styles,         // applyStyles
  prepareStyles,  // applyStyles
}) =>
  <div id="xxx-container" style={styles.container}>
    <header style={styles.pageHeader.root}>
      <span style={prepareStyles(styles.pageHeader.title)}>{title}</span>
      {description && <span style={prepareStyles(styles.pageHeader.description)}>{description}</span>}
    </header>
    <div style={prepareStyles(styles.pageContent)}>
      {children}
    </div>
  </div>

export default applyStyleSheet(PageLayout)
