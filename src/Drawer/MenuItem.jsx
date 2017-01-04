import React, { Component, PropTypes } from 'react'
import MuiMenuItem from 'material-ui/MenuItem'

import withTheme from '../theme/withTheme'
import { Icon } from '../Icon'


class MenuItem extends Component {

  static contextTypes = {
    drawerDomain: PropTypes.object,
  }

  onTouchTap = () => {
    this.context.drawerDomain && this.context.drawerDomain.onTouchTap()
    this.props.onTouchTap && this.props.onTouchTap()
  }

  render = () => {
    const {
      icon,
      styles,
      children,
      primaryText,
      onTouchTap,  // eslint-disable-line no-unused-vars
      theme, // eslint-disable-line no-unused-vars
      prepareStyles, // eslint-disable-line no-unused-vars
      active, // eslint-disable-line no-unused-vars
      ...childProps
    } = this.props
    return (
      <MuiMenuItem
        onTouchTap={this.onTouchTap}
        leftIcon={<Icon style={styles.icon} ligature={icon} />}
        style={styles}
        primaryText={<span style={styles.primaryText}>{ primaryText }</span>}
        {...childProps}
      />
    )
  }
}

const mapThemeToStyles = ({ drawer }, { active }) => ({
  icon: {
    ...drawer.menuItem,
    ...(active ? drawer.active : {}),
  },
  primaryText: {
    ...drawer.menuItem,
  },
})

export default
  withTheme(mapThemeToStyles)(
    MenuItem
  )
