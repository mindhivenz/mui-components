import React from 'react'
import { observer } from 'mobx-react'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import transitions from 'material-ui/styles/transitions'

import { app } from '@mindhive/di'

import { Icon } from '../Icon'
import withStyles from '../theme/withStyles'


const FollowPointerFab = ({
  inject: { inlineFabDomain } = app(),
  styles,
  onTouchTap,
}) =>
  <FloatingActionButton
    style={{ ...styles, left: inlineFabDomain.position - 30 }}
    secondary
    onTouchTap={onTouchTap}
  >
    <Icon ligature="add" />
  </FloatingActionButton>

const mapThemeToStyles = (_, { open }) => {
  const scale = open ? 1 : 0
  const duration = open ? '450ms' : '225ms'
  return ({
    position: 'relative',
    top: -8,
    zIndex: 10000,
    transition: transitions.easeOut(duration, 'transform', null),
    transform: `scale(${scale}, ${scale})`,
  })
}

export default
  withStyles(mapThemeToStyles)(
    observer(FollowPointerFab)
  )
