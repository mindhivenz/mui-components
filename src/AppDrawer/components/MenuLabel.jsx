import React from 'react'
import RenderToLayer from 'material-ui/internal/RenderToLayer'

import { injectStylesSheet } from './DrawerStyles'
import MenuItemFlyOut from './MenuItemFlyOut'

class MenuLabel extends React.Component {

  state = {
    top: 0,
  }

  componentDidMount() {
    this.setState({
      top: this.container.parentNode.getBoundingClientRect().top,
    })
  }

  render = () => {
    const {
      primaryText,
      onTouchTap,
      icon,
      active,
      menuItems,
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
              menuItems={menuItems}
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
