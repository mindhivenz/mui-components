import React from 'react'
import MuiDivider from 'material-ui/Divider'
import withStyles from '../theme/withStyles'

const Divider = ({ theme }) => <MuiDivider style={theme.drawer.divider} />

export default
  withStyles()(
    Divider
  )
