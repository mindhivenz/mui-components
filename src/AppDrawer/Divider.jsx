import React from 'react'
import MuiDivider from 'material-ui/Divider'
import { injectStylesSheet } from './components/DrawerStyles'

const Divider = ({ styles }) => <MuiDivider style={styles.divider} />

export default injectStylesSheet(Divider)
