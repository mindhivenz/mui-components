import React from 'react'
import MuiDivider from 'material-ui/Divider'
import withTheme from '../theme/withTheme'

const Divider = ({ theme }) => <MuiDivider style={theme.drawer.divider} />

export default
  withTheme()(
    Divider
  )
