import React from 'react'
import PropTypes from 'prop-types'
import RenderToLayer from 'material-ui/internal/RenderToLayer'

import { injectStylesSheet } from './DrawerStyles'
import MenuItemFlyOut from './MenuItemFlyOut'

class MenuLabel extends React.Component {

  state = {
    top: 0,
  }

  handleResize = (e) => {
    clearTimeout(this.deferTimer)
    this.updateTop()
    this.deferTimer = setTimeout(this.handleResize, 150)
  }

  updateTop = (e) => {
    this.setState({
      top: this.container.parentNode.getBoundingClientRect().top,
    })
  }

  componentDidMount() {
    if (!this.props.drawerDomain.isFixedWidth) {
      this.handleResize()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.deferTimer)
  }

  render = () => {
    const {
      primaryText,
      onTouchTap,
      icon,
      active,
      subMenuDomain,
      drawerDomain,
    } = this.props
    const top = this.state.top
    return (
      <div ref={(node) => { this.container = node }}>
      <RenderToLayer
          render={() =>
            <MenuItemFlyOut
              primaryText={primaryText}
              icon={icon}
              onTouchTap={onTouchTap}
              active={active}
              subMenuDomain={subMenuDomain}
              drawerDomain={drawerDomain}
              top={top}
            />
          }
          open
          useLayerForClickAway={false}
        />
      </div>
    )
  }
}

MenuLabel.contextTypes = {
  domain: PropTypes.object.isRequired,
}

export default injectStylesSheet(MenuLabel)
