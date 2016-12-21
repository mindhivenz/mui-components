import React, { Component, PropTypes } from 'react'

class FocusTrap extends Component {

  // propTypes: {
  //   onFocus: PropTypes.func,
  //   onBlur: PropTypes.func,
  //   component: PropTypes.any,
  //   children: PropTypes.node
  // }

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