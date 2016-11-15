import React from 'react'

import { injectStylesSheet } from './PageLayoutStyles'
import PageHeader from './PageHeader'

const PageLayout = ({
  title,
  description,
  children,

  styles,         // applyStyles
  prepareStyles,  // applyStyles
}) =>
  <div style={styles.container}>
    <PageHeader title={title} description={description} />
    <div style={prepareStyles(styles.pageContent)}>
      {children}
    </div>
  </div>

export default injectStylesSheet(PageLayout)
