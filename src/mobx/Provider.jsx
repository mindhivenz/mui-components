import { Component, PropTypes, Children } from 'react'


export default class Provider extends Component {

  getChildContext() {
    return { mobxStore: this.mobxStore }
  }

  constructor(props, context) {
    super(props, context)
    this.mobxStore = props.mobxStore
  }

  render() {
    return Children.only(this.props.children)
  }
}

Provider.propTypes = {
  mobxStore: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}
Provider.childContextTypes = {
  mobxStore: PropTypes.object.isRequired
}