import { Component } from 'react'

import _throttle from 'lodash/throttle'
import { createEagerElement } from 'recompose'


import WatchElementResize from './core/base'

const defaultWatcherName = 'resizeWatcher'

class Watcher {

  _width = undefined
  _height = undefined
  _node = undefined

  constructor(onResize, {name, throttle, echoOnly} = {}) {
    this.onResize = onResize
    this.name = name || defaultWatcherName
    this.throttle = throttle === undefined ? true : throttle
    this.echoOnly = echoOnly || false
  }

  _onResizeEvent = (evt) => {
    const { top, left, width, height } = evt.element.offset
    if (width && height && (width !== this._width || height !== this._height)) {
      this._width = width
      this._height = height
      if (! this.echoOnly) {
        this.onResize({top, left, width, height}, this)
      } else {
      }
    }
  }

  _onResizeEventThrottle = _throttle(this._onResizeEvent, 150, { 'leading': true, 'trailing': true })

  _resizeProps = () => ({[this.name]: this})

  registerNode = (node) => {
    if (! this._node) {
      this._node = node
      this._createWatcher()
    }
  }

  _createWatcher = () => {
    if (this._node) {
      this.watcher =
        new WatchElementResize(this._node)
        .on('resize', this.throttle ? this._onResizeEventThrottle : this._onResizeEvent)
    }
  }

  didMount = () => {
    this._createWatcher()
  }

  willUnmount = () => {
    if (this.watcher) {
      this.watcher.removeListener()
      this.watcher = undefined
    }
  }

}

export default (onResize, options) => (BaseComponent) => {

  return class extends Component {

    constructor(props) {
      super(props)
      this.resizeWatcher = new Watcher(({top, left, width, height}, watcher) => onResize({ top, left, width, height }, props, watcher), options)
    }

    componentDidMount() {
      this.resizeWatcher.didMount()
    }

    componentWillUnmount() {
      this.resizeWatcher.willUnmount()
    }

    render() {
      return createEagerElement(BaseComponent, { ...this.props, ...this.resizeWatcher._resizeProps() })
    }

  }
}

