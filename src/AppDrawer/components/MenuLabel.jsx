import React from 'react'
import RenderToLayer from 'material-ui/internal/RenderToLayer'

import { injectStylesSheet } from './DrawerStyles'
import ExpandVisible from './ExpandVisible'
import MenuItemFlyOut from './MenuItemFlyOut'

class MenuLabel extends React.Component {

  componentDidMount() {
    this.setState({
      top: this.container.getBoundingClientRect().top,
    })
  }

  render = () => {
    const {
      styles,
      prepareStyles,
      children,
      onTouchTap,
      leftIcon,
      onHover,
      hovered,
      active,
    } = this.props
    const { domain } = this.context
    return (
      <div
        ref={(node) => { this.container = node }}
        style={prepareStyles(styles.menuLabel.container)}
      >
        <ExpandVisible hideWhenNarrow style={styles.menuLabel.expanded}>{ children }</ExpandVisible>
        { ! domain.expanded &&
        <RenderToLayer
          render={() =>
            <MenuItemFlyOut
              leftIcon={leftIcon}
              onTouchTap={onTouchTap}
              onHover={onHover}
              menuItemHovered={hovered}
              active={active}
              top={this.state.top}
            >
              { children }
            </MenuItemFlyOut>
          }
          open
          useLayerForClickAway={false}
        />
        }
      </div>
    )
  }
}

MenuLabel.contextTypes = {
  domain: React.PropTypes.object.isRequired,
}

export default injectStylesSheet(MenuLabel)
