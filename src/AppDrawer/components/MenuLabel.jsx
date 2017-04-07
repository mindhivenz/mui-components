import React from 'react'
import RenderToLayer from 'material-ui/internal/RenderToLayer'

import { injectStylesSheet } from './DrawerStyles'
import MenuItemFlyOut from './MenuItemFlyOut'

class MenuLabel extends React.Component {

  state = {
    top: 0,
  }

  handleResize(e) {
    this.setState({
      top: this.container.parentNode.getBoundingClientRect().top,
    })
  }

  componentDidMount() {
    this.handleResize()
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
  domain: React.PropTypes.object.isRequired,
}

export default injectStylesSheet(MenuLabel)
