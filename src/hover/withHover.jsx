import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const withHover = ({ mouseLeaveDelay = 0, mouseOverOnMount = false, inline = false } = {}) =>
  DecoratedComponent =>
    class WithHover extends Component {

      state = {
        hovered: false,
        touch: false,
      }

      componentDidMount = () => {
        // Check if we were rendered under the mouse, and if so,
        // trigger an onMouseEnter event.
        // This needs to be called from a setTimeout otherwise the browser won't have
        // a chance to set :hover state.
        this.container = ReactDOM.findDOMNode(this)
        if (mouseOverOnMount) {
          const listItem = this.container.querySelector(':first-child')
          setTimeout(() => {
            const hovered = this.container.parentElement &&
              this.container.parentElement.querySelector(':hover:first-child')
            if (hovered && hovered.id === listItem.id) {
              // this.handleMouseOver()
            }
          }, 0)
        }
      }

      handleMouseOver = () => {
        if (! this.state.touch) this.setState({ hovered: true })
      }

      handleMouseLeave = () => {
        setTimeout(() => {
          this.setState({ hovered: false })
        }, mouseLeaveDelay)
      }

      cancelHovered = () => {
        this.setState({ hovered: false })
      }

      render() {
        return (
          <div
            style={{ display: inline ? 'inline-block' : 'block' }}
            onMouseEnter={this.handleMouseOver}
            onMouseOver={this.handleMouseOver}
            onMouseMove={this.handleMouseMove}
            onMouseLeave={this.handleMouseLeave}
          >
            <DecoratedComponent
              {...this.props}
              {...this.state}
              cancelHovered={this.cancelHovered}
            />
          </div>
        )
      }
    }

export default withHover
