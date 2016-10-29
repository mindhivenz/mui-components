import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { observer } from 'mobx-react'
import { app } from '@mindhive/di'

import withTheme from '../theme/withTheme'
import withHover from '../hover/withHover'

import FollowPointerFab from './FollowPointerFab'
import ExpandedHoverTarget from './ExpandedHoverTarget'

class InlineFab extends Component {

  componentDidMount = () => {
    this.container = ReactDOM.findDOMNode(this)
  }


  handleMouseMove = (e) => {
    const { inlineFabDomain } = app()
    const clientRect = this.container.getBoundingClientRect()
    const clientX = e.nativeEvent.clientX
    let position = clientX - clientRect.left
    if (position < 0) {
      position = 0
    } else if (position > clientRect.right - clientRect.left) {
      position = clientRect.right - clientRect.left
    }
    inlineFabDomain.setPosition(position)
  }

  handleTap = () => {
    this.props.cancelHovered()
    this.props.onTouchTap()
  }

  render() {
    const {
      styles,
      domains: { inlineFabDomain } = app(),
      hovered,
    } = this.props
    inlineFabDomain.setHovered(hovered)
    return (
      <div
        onMouseMove={this.handleMouseMove}
        style={styles.hoverTarget}
      >
        <ExpandedHoverTarget open={hovered}>
          <FollowPointerFab
            open={hovered}
            onTouchTap={this.handleTap}
          />
        </ExpandedHoverTarget>
      </div>
    )
  }
}

const mapThemeToStyles = ({
  spacing,
}) => ({
  hoverTarget: {
    height: spacing.desktopGutterMini,
  },
})

export default withHover({ mouseLeaveDelay: 150 })(
  withTheme(
  observer(InlineFab),
  mapThemeToStyles
))
