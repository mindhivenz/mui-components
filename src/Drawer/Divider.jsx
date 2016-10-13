import React from 'react'
import MuiDivider from 'material-ui/Divider'
import { withTheme } from '@mindhive/ui-tools'

const Divider = ({ theme }) => <MuiDivider style={Theme.drawer.divider} />

export default withTheme(Divider)
