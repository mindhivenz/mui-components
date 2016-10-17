import React, { Component, PropTypes } from 'react'
import MuiMenuItem from 'material-ui/MenuItem'

import withTheme from '../theme/withTheme'
import { Icon } from '../Icon'


class MenuItem extends Component {

  static contextTypes = {
    drawerOnTouchTap: PropTypes.func,
  }

  onTouchTap = () => {
    this.context.drawerOnTouchTap && this.context.drawerOnTouchTap()
    this.props.onTouchTap && this.props.onTouchTap()
  }

  render = () => {
    const {
      icon,
      styles,
      onTouchTap,  // eslint-disable-line no-unused-vars
      theme, // eslint-disable-line no-unused-vars
      prepareStyles, // eslint-disable-line no-unused-vars
      active, // eslint-disable-line no-unused-vars
      ...childProps,
    } = this.props
    return (
      <MuiMenuItem
        onTouchTap={this.onTouchTap}
        leftIcon={<Icon style={styles} ligature={icon} />}
        style={styles}
        {...childProps}
      />
    )
  }
}

const calcStyles = ({ drawer }, { active }) => ({
  ...drawer.menuItem,
  ...(active ? drawer.active : {}),
})

export default withTheme(MenuItem, calcStyles)
