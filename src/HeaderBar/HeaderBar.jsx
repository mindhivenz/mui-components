import React from 'react'
import withStyles from '../theme/withStyles'


const HeaderBar = ({
  children,
  styles,
}) =>
  <header style={styles}>{children}</header>


const mapThemeToStyles = ({
  palette,
  spacing,
  dialog,
  headerBar: {
    color,
    disabledColor,
    backgroundColor,
    disabledBackgroundColor,
  },
}, {
  disabled,
  style = {},
}) => ({
  padding: `${spacing.desktopGutterLess}px ${spacing.desktopGutter}px`,
  fontSize: dialog.titleFontSize,
  color: disabled ? disabledColor : color,
  backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
  ...style,
})


export default
  withStyles(mapThemeToStyles)(
    HeaderBar
  )
