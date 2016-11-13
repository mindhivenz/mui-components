import withStyleSheet from '../theme/withStyleSheet'
import transitions from 'material-ui/styles/transitions'

/**
 * These styles are added to the theme and can be overridden by
 * client code, they handle all themeable appearance
 */
export default ({
  palette,
  colorManipulator,
}) => ({
  dashboardTile: {
    backgroundColor: '#444444',
    calcTextColor: color => colorManipulator.lighten(color, 0.95),
    calcValueColor: color => colorManipulator.lighten(color, 0.95),
    calcTitleColor: color => colorManipulator.lighten(color, 0.75),
    bylineColor: palette.disabledColor,
  },
})


/**
 * These styles are internal to the component and are responsible
 * for component layout/structure
 */

const mapThemeToStyles = ({
  typography,
  dimensions,
  spacing,
  dashboardTile,
}, {
  style = {},
  hovered,
  onClick,
}) => {
  const tileColor = style.backgroundColor || dashboardTile.backgroundColor
  const scale = onClick && hovered ? 1.015 : 1
  return ({
    container: {
      position: 'relative',
      display: 'inline-block',
      width: 3 * spacing.desktopKeylineIncrement,
      height: 3 * spacing.desktopKeylineIncrement,
      verticalAlign: 'top',
      margin: spacing.desktopGutterMini / 2,
      padding: spacing.desktopGutter * 2,
      textAlign: 'center',
      color: dashboardTile.calcTextColor(tileColor),
      transition: transitions.easeOut(null, 'transform', null),
      transform: `scale(${scale}, ${scale})`,
      ...style,
    },
    value: {
      fontFamily: 'Arial Black',
      color: dashboardTile.calcValueColor(tileColor),
      fontWeight: 1000,
      fontSize: 1.25 * spacing.desktopKeylineIncrement,
    },
    title: {
      color: dashboardTile.calcTitleColor(tileColor),
      fontWeight: typography.fontWeightMedium,
      fontSize: spacing.desktopGutter - 5,
    },
    byline: {
      color: dashboardTile.bylineColor,
      fontWeight: typography.fontWeightLight,
      fontSize: spacing.desktopGutterLess,
    },
    content: {
      marginTop: spacing.desktopGutter,
    },
    blankRow: {
      fontSize: spacing.desktopGutterMini,
      lineHeight: `${spacing.desktopGutterMini}px`,
    },
    dataRow: {
      fontWeight: typography.fontWeightLight,
      fontSize: spacing.desktopGutterLess,
      cursor: 'pointer',
    },
    dataRowLabel: {
      display: 'inline-block',
      textAlign: 'left',
      width: '70%',
      fontSize: spacing.desktopGutterLess,
      fontWeight: typography.fontWeightLight,
    },
    dataRowValue: {
      display: 'inline-block',
      textAlign: 'right',
      width: '30%',
      fontWeight: typography.fontWeightMedium,
    },

  })
}

export const injectStylesSheet = Component =>
  withStyleSheet(mapThemeToStyles)(Component)

