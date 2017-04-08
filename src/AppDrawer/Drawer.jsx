import React from 'react'
import PropTypes from 'prop-types'
import Container from './components/Container'

class Drawer extends React.Component {

  getChildContext() {
    return { domain: this.props.domain }
  }

  render() {
    const {
      children,
      ...props,
    } = this.props
    return <Container {...props}>{children}</Container>
  }
}

Drawer.childContextTypes = {
  domain: PropTypes.object,
}

export default Drawer
