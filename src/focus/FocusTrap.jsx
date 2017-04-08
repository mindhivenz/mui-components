import React, { Component } from 'react'

export const TAB = 13
export const ENTER = 13

class FocusTrap extends Component {

  render() {
    const {
      component: Component = 'div',
      children,
      ...props
    } = this.props;

    return (
      <Component tabIndex="-1" {...props}>
        {children}
      </Component>
    )
  }

}

export default FocusTrap
