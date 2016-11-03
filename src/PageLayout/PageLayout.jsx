import React from 'react'
import spacing from 'material-ui/styles/spacing'
import transitions from 'material-ui/styles/transitions'
import { app } from '@mindhive/di'

import withTheme from '../theme/withTheme'


const PageLayout = ({
  children,
  title,
  description,
  styles,
  prepareStyles,
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


const titleRoot = {
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  margin: 0,
  paddingTop: 0,
  letterSpacing: 0,
}

const themeToStyles = ({
  pageLayout,
  dimensions,
  drawer,
  appBar,
}, {
  domains: { navDrawerDomain } = app(),
}) => ({
  container: {
    position: 'fixed',
    boxSizing: 'border-box',
    overflowY: 'auto',
    height: `calc(100% - ${spacing.desktopKeylineIncrement}px)`,
    transition: transitions.easeOut(null, 'size', null),
    width: navDrawerDomain.docked ? `calc(100% - ${drawer.width}px)` : '100%',
  },
  pageHeader: {
    root: {
      backgroundColor: pageLayout.headerBackgroundColor,
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      position: 'relative',
      padding: appBar.padding,
    },
    title: {
      ...titleRoot,
      color: pageLayout.titleColor,
      fontSize: 20,
      fontWeight: appBar.titleFontWeight,
      height: '30px',
      lineHeight: '30px',
    },
    description: {
      ...titleRoot,
      color: pageLayout.descriptionColor,
      fontSize: 14,
      height: '14px',
      lineHeight: '14px',
      paddingBottom: '5px',
    },
  },
  pageContent: {
    margin: `${spacing.desktopGutter}px auto`,
    marginTop: spacing.desktopSubheaderHeight,
    padding: `0 ${spacing.desktopGutter}px`,
    maxWidth: pageLayout.contentMaxWidth,
  },
})

export default withTheme(PageLayout, themeToStyles)
