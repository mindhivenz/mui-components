import React, { Component } from 'react'
import PropTypes from 'prop-types'


const FocusTrap = ({
  component: Component,
  children,
  ...props
}) =>
  <Component tabIndex="-1" {...props}>
    {children}
  </Component>

FocusTrap.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  component: PropTypes.any,
  children: PropTypes.node
}

FocusTrap.defaultProps = {
  component: 'div'
}

export default FocusTrap
