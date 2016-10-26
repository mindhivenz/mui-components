import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { app } from '@mindhive/di'

import withTheme from '../theme/withTheme'

import FollowPointerFab from './FollowPointerFab'
import ExpandedHoverTarget from './ExpandedHoverTarget'

class InlineFab extends Component {

  state = {
    hovered: false,
    touch: false,
    xPosition: 0,
  }

  componentDidMount = () => {
    // Check if we were rendered under the mouse, and if so,
    // trigger an onMouseEnter event.
    // This needs to be called from a setTimeout otherwise the browser won't have
    // a chance to set :hover state.
    this.container = ReactDOM.findDOMNode(this)
    const listItem = this.container.querySelector(':first-child')
    setTimeout(() => {
      const hovered = this.container.parentElement && this.container.parentElement.querySelector(':hover:first-child')
      if (hovered && hovered.id === listItem.id) {
        this.handleMouseOver()
      }
    }, 0)
  }

  handleMouseOver = () => {
    if (! this.state.touch) this.setState({ hovered: true })
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
    // this.setState({ xPosition: e.nativeEvent.clientX - clientRect.left })
  }

  handleMouseLeave = () => {
    setTimeout(() => {
      this.setState({ hovered: false })
    }, 150)
  }

  handleTap = () => {
    this.setState({ hovered: false })
    this.props.onTouchTap()
  }

  render() {
    const {
      styles,
    } = this.props
    return (
      <div
        onMouseEnter={this.handleMouseOver}
        onMouseOver={this.handleMouseOver}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        style={styles.hoverTarget}
      >
        <ExpandedHoverTarget open={this.state.hovered}>
          <FollowPointerFab
            open={this.state.hovered}
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

export default withTheme(
  observer(InlineFab),
  mapThemeToStyles
)
