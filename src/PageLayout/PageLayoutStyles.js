import transitions from 'material-ui/styles/transitions'
import { app } from '@mindhive/di'
import withStyleSheet from '../theme/withStyleSheet'

/**
 * These styles are added to the theme and can be overridden by
 * client code, they handle all themeable appearance
 */
export default ({
  palette,
  colorManipulator,
  dimensions,
  appBar,
}) => ({
  pageLayout: {
    containerBackgroundColor: palette.bodyColor,
    headerBackgroundColor: palette.darkPrimary1Color,
    titleColor: palette.alternateTextColor,
    titleHeight: 30,
    titleFontSize: 20,
    titleFontWeight: appBar.titleFontWeight,
    descriptionColor: colorManipulator.fade(palette.alternateTextColor, 0.6),
    descriptionFontSize: 14,
    contentMaxWidth: dimensions.contentMaxWidthWide,
  },
})


/**
 * These styles are internal to the component and are responsible
 * for component layout/structure
 */
const titleRoot = {
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  margin: 0,
  paddingTop: 0,
  letterSpacing: 0,
}

const mapThemeToStyles = ({
  pageLayout: {
    titleColor,
    containerBackgroundColor,
    headerBackgroundColor,
    titleHeight,
    titleFontSize,
    titleFontWeight,
    descriptionColor,
    descriptionFontSize,
    contentMaxWidth: themeMaxWidth,
  },
  dimensions,
  spacing,
  drawer,
  appBar,
}, {
  domains: { navDrawerDomain } = app(),
  style = {},
  contentMaxWidth,
}) => ({
  container: {
    position: 'fixed',
    boxSizing: 'border-box',
    overflowY: 'auto',
    height: `calc(100% - ${spacing.desktopKeylineIncrement}px)`,
    transition: transitions.easeOut(null, 'size', null),
    width: navDrawerDomain.docked ? `calc(100% - ${drawer.width}px)` : '100%',
    backgroundColor: containerBackgroundColor,
    ...style,

  },
  pageHeader: {
    root: {
      backgroundColor: headerBackgroundColor,
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      position: 'relative',
      padding: appBar.padding,
    },
    title: {
      ...titleRoot,
      color: titleColor,
      fontSize: titleFontSize,
      fontWeight: titleFontWeight,
      height: titleHeight,
      lineHeight: `${titleHeight}px`,
    },
    description: {
      ...titleRoot,
      color: descriptionColor,
      fontSize: descriptionFontSize,
      height: descriptionFontSize,
      lineHeight: `${descriptionFontSize}px`,
      paddingBottom: '5px',
    },
  },
  pageContent: {
    margin: `${spacing.desktopGutter}px auto`,
    marginTop: spacing.desktopSubheaderHeight,
    padding: `0 ${spacing.desktopGutter}px`,
    maxWidth: contentMaxWidth || themeMaxWidth,
  },
})

export const injectStylesSheet = PageLayout =>
  withStyleSheet(mapThemeToStyles)(PageLayout)

