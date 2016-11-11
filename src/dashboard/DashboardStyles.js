import withStyleSheet from '../theme/withStyleSheet'

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
  style = {} ,
}) => {
  const tileColor = style.backgroundColor || dashboardTile.backgroundColor
  return ({
    container: {
      display: 'inline-block',
      width: 3 * spacing.desktopKeylineIncrement,
      height: 3 * spacing.desktopKeylineIncrement,
      verticalAlign: 'top',
      margin: spacing.desktopGutterMini / 2,
      padding: spacing.desktopGutter * 2,
      textAlign: 'center',
      color: dashboardTile.calcTextColor(tileColor),
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
    dataRow: {
      fontWeight: typography.fontWeightLight,
      fontSize: spacing.desktopGutterLess + 5,
      cursor: 'pointer',
    },
    dataRowLabel: {
      display: 'inline-block',
      textAlign: 'left',
      width: '70%',
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

