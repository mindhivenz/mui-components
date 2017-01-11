import React from 'react'
import FlatButton from 'material-ui/FlatButton'

import withStyles from './theme/withStyles'


const mapThemeToStyles = theme => ({
  margin: '0 auto',
  padding: '100px 50px 100px 50px',
  display: 'block',
  fontSize: 20,
  fontWeight: theme.appBar.titleFontWeight,
  textAlign: 'center',
  color: theme.palette.errorText,
  icon: {
    position: 'relative',
    top: '4px',
    marginRight: '10px',
    color: theme.colorManipulator.darken(theme.palette.errorText, 0.1),
  },
})

const Error = ({
  styles,
}) =>
  <div style={styles}>
    <span style={styles.text}>
      Sorry.<br />
      Somehow you've ended up in the wrong place.<br />
      Try refreshing the page.
    </span>
    <div>
      <FlatButton
        label="Refresh"
        onTouchTap={window.location.reload}
      />
    </div>
  </div>

export default
  withStyles(mapThemeToStyles)(
    Error
  )
