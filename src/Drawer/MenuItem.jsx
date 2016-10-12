import React from 'react'
import { connect } from 'react-redux'
import MuiMenuItem from 'material-ui/MenuItem'

import { withTheme } from '@mindhive/ui-tools'
import { Icon } from '../Icon'

import { setNavDrawerOpenAction } from './navDrawerActions'

const MenuItem = ({
  onTouchTap,
  icon,
  styles,
  childProps,
}) =>
  <MuiMenuItem
    onTouchTap={onTouchTap}
    leftIcon={<Icon style={styles} ligature={icon} />}
    style={styles}
    {...childProps}
  />


const Themed = withTheme(
  MenuItem,
  ({ drawer }, { active }) => ({
    ...drawer.menuItem,
    ...(active ? drawer.active : {}),
  })
)

const mapStateToProps = ({
  navDrawer: { docked },
}, {
  onTouchTap,
  active,
  ...childProps,
}) => ({
  docked,
  active,
  onTouchTap: () => {
    if (! docked) {
      setNavDrawerOpenAction(false)
    }
    if (onTouchTap) {
      onTouchTap()
    }
  },
  childProps,
})

export default connect(mapStateToProps)(Themed)
