import React from 'react'

import Paper from 'material-ui/Paper'

import withStyles from '../theme/withStyles'
import HeaderBar from '../HeaderBar/HeaderBar'


const HeaderContainer = ({
  children,
  title,
  disabled,
  styles,
  zDepth = 2,
  maxWidth = 350,
  headerStyle = {},
  backgroundStyle = {},
}) =>
  <Paper zDepth={zDepth} style={{ ...styles.container, maxWidth, ...backgroundStyle }}>
    <HeaderBar disabled={disabled} style={headerStyle}>{title}</HeaderBar>
    <div style={styles.content}>
      {children}
    </div>
  </Paper>

const mapThemeToStyles = ({ spacing }) => ({
  container: {
    margin: '0 auto',
  },
  content: {
    padding: spacing.desktopGutter,
    paddingTop: spacing.desktopGutter,
  },
})


export default
  withStyles(mapThemeToStyles)(
    HeaderContainer
  )
