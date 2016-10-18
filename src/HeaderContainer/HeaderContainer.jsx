import React from 'react'
import withTheme from '../theme/withTheme'

import Paper from 'material-ui/Paper'

import HeaderBar from '../HeaderBar/HeaderBar'


const HeaderContainer = ({
  children,
  title,
  disabled,
  styles,
  zDepth = 2,
  maxWidth = 350,
}) =>
  <Paper zDepth={zDepth} style={{ ...styles.container, maxWidth }}>
    <HeaderBar disabled={disabled}>{title}</HeaderBar>
    <div style={styles.content}>
      {children}
    </div>
  </Paper>

const calcStyles = ({ spacing }) => ({
  container: {
    margin: '0 auto',
  },
  content: {
    padding: spacing.desktopGutter,
    paddingTop: spacing.desktopGutter,
  },
})


export default withTheme(HeaderContainer, calcStyles)
