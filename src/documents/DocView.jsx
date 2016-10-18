import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { ListItem } from 'material-ui/List'

import { withTheme } from '@mindhive/components/theme'


class DocView extends Component {

  state = {
    hovered: false,
    touch: false,
  }

  componentDidMount = () => {
    // Check if we were rendered under the mouse, and if so,
    // trigger an onMouseEnter event.
    // This needs to be called from a setTimeout otherwise the browser won't have
    // a chance to set :hover state.
    const container = ReactDOM.findDOMNode(this)
    const listItem = container.querySelector(':first-child')
    setTimeout(() => {
      const hovered = container.parentElement.querySelector(':hover:first-child')
      if (hovered && hovered.id === listItem.id) {
        this.handleMouseOver()
      }
    }, 0)
  }

  handleMouseOver = () => {
    if (! this.state.touch) this.setState({ hovered: true })
  }

  handleMouseLeave = () => {
    this.setState({ hovered: false })
  }

  render() {
    const {
      id,
      disabled,
      leftIcon,
      primaryText,
      secondaryText,
      leftAvatar,
      rightAvatar,
      rightIconButton,
      onTouchTap,
      styles,
    } = this.props

    const containerStyle = Object.assign({}, this.state.hovered ? styles.container.hovered : {})
    const iconStyle = Object.assign({}, styles.icon, this.state.hovered ? styles.icon.hovered : {})
    const primaryTextStyle = Object.assign({},
      disabled
        ? styles.primaryText.disabled
        : this.state.hovered
          ? styles.primaryText.hovered
          : {}
    )
    const secondaryTextStyle = Object.assign({}, disabled ? styles.secondaryText.disabled : {})

    return (
      <ListItem
        ref="listItem"
        disableTouchRipple
        id={id}
        leftIcon={leftIcon && React.cloneElement(leftIcon, { style: iconStyle })}
        primaryText={<div style={primaryTextStyle}>{primaryText}</div>}
        secondaryText={<div style={secondaryTextStyle}>{secondaryText}</div>}
        leftAvatar={leftAvatar}
        rightAvatar={rightAvatar}
        rightIconButton={rightIconButton}
        onTouchTap={onTouchTap}
        onMouseEnter={this.handleMouseOver}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        style={containerStyle}
      />
    )
  }
}

const calcStyles = ({
  docList: { icon, primaryText, secondaryText },
  paper,
}) => ({
  container: {
    hovered: {
      zDepth: 1,
      ...paper,
      boxShadow: paper.zDepthShadows[0],
      borderRadius: '2px',
      transform: 'scale(1.015, 1)',
      position: 'relative',
    },
  },
  icon,
  primaryText,
  secondaryText,
})

export default withTheme(DocView, calcStyles)

