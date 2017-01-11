import React from 'react'
import { observer } from 'mobx-react'

import withStyles from '../theme/withStyles'


const ExpandedHoverTarget = ({
  styles,
  children,
}) =>
  <div style={styles}>{children}</div>

const mapThemeToStyles = (_, { open }) => {
  const top = -16
  const height = 32
  const pointerEvents = open ? 'auto' : 'none'
  return ({
    position: 'relative',
    top,
    height,
    zIndex: 9999,
    pointerEvents,
  })
}

export default
  withStyles(mapThemeToStyles)(
    observer(ExpandedHoverTarget)
  )
