import { app } from '@mindhive/di'
import withStyles from '../theme/withStyles'
import { trans as transitions } from '../styles/animations'

/**
 * These styles are added to the theme and can be overridden by
 * client code, they handle all themeable appearance
 */
export default ({
  palette,
  colorManipulator,
  dimensions,
  typography,
  appBar,
}) => ({
  pageLayout: {
    containerBackgroundColor: palette.bodyColor,
    headerBackgroundColor: palette.darkPrimary1Color,
    titleColor: palette.alternateTextColor,
    titleHeight: 30,
    titleFontSize: 18,
    titleFontWeight: typography.fontWeight100,
    descriptionColor: colorManipulator.fade(palette.alternateTextColor, 0.6),
    descriptionFontSize: 14,
    descriptionFontWeight: typography.fontWeight100,
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
    descriptionFontWeight,
    contentMaxWidth: themeMaxWidth,
  },
  dimensions,
  spacing,
  drawer,
  appBar,
}, {
  inject: { layoutDomain } = app(),
  style = {},
  contentWidth,
}) => ({
  container: {
    position: 'fixed',
    boxSizing: 'border-box',
    overflowY: 'auto',
    height: `calc(100% - ${spacing.desktopKeylineIncrement}px)`,
    transition: transitions.cubicAll,
    width: `calc(100% - ${layoutDomain.leftOffset}px)`,
    backgroundColor: containerBackgroundColor,
    ...style,
  },
  pageHeader: {
    root: {
      backgroundColor: headerBackgroundColor,
      position: 'relative',
      padding: `${spacing.desktopGutterMini}px ${spacing.desktopGutter}px`,
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
      fontWeight: titleFontWeight,
      height: descriptionFontSize,
      lineHeight: `${descriptionFontSize}px`,
      paddingBottom: '5px',
    },
  },
  pageContent: {
    margin: `${spacing.desktopGutter}px auto`,
    marginTop: spacing.desktopSubheaderHeight,
    padding: `0 ${spacing.desktopGutter}px`,
    width: contentWidth || 'auto',
    maxWidth: contentWidth || themeMaxWidth,
  },
})

export const injectStylesSheet = PageLayout =>
  withStyles(mapThemeToStyles)(PageLayout)

