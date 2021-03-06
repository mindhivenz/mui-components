import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

import withStyles from './theme/withStyles'


// TODO: delay the display of this

const mapThemeToStyles = theme => ({
  loading: {
    margin: '0 auto',
    padding: '100px 0',
    display: 'block',
    color: theme.palette.darkPrimary1Color,
  },
})

const Loading = ({
  styles,
}) =>
  <CircularProgress
    size={120}
    style={styles.loading}
    color={styles.loading.color}
  />

export default
  withStyles(mapThemeToStyles)(
    Loading
  )
