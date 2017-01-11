import withStyles from '../theme/withStyles'
import transitions from 'material-ui/styles/transitions'

export default ({
  palette,
  spacing,
  colorManipulator,
}) => {
  const tileSize = spacing.desktopKeylineIncrement * 3
  const padding = spacing.desktopGutter * 2
  const margin = spacing.desktopGutterMini / 2

  return ({
    dashboardTile: {
      boxSizing: 'border-box',
      backgroundColor: '#444444',
      calcTextColor: color => colorManipulator.lighten(color, 0.95),
      calcValueColor: color => colorManipulator.lighten(color, 0.95),
      calcTitleColor: color => colorManipulator.lighten(color, 0.75),
      bylineColor: palette.disabledColor,
      hoverScale: 1.015,
      width: tileSize,
      height: tileSize,
      margin,
      padding,
    },
  })
}

// (spacing.desktopKeylineIncrement * 3) + (spacing.desktopGutter * 2) + ((spacing.desktopGutterMini / 2) * 2)
export const tileSize = 288 + 16

const mapThemeToStyles = ({
  typography,
  spacing,
  dashboardTile,
}, {
  style = {},
  hovered,
  onClick,
}) => {
  const tileColor = style.backgroundColor || dashboardTile.backgroundColor
  const scale = onClick && hovered ? dashboardTile.hoverScale : 1
  return ({
    container: {
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'top',
      margin: dashboardTile.margin,
      padding: dashboardTile.padding,
      width: dashboardTile.width,
      height: dashboardTile.height,
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
    customRow: {
      color: dashboardTile.calcTitleColor(tileColor),
      fontWeight: typography.fontWeightMedium,
      fontSize: spacing.desktopGutter - 5,
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
  withStyles(mapThemeToStyles)(Component)

