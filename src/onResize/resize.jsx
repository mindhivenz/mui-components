import React from 'react'
import _throttle from 'lodash/throttle'
import { compose, lifecycle } from 'recompose'


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
    // if (this.name !== defaultWatcherName) console.log(`Create resize watcher ${this.name}`)
  }

  _onResizeEvent = (evt) => {
    // if (this.name !== defaultWatcherName || this.echoOnly) console.log(`${this.name}._onResizeEvent`, evt)
    const { top, left, width, height } = evt.element.offset
    if (width && height && (width !== this._width || height !== this._height)) {
      this._width = width
      this._height = height
      if (! this.echoOnly) {
        this.onResize({top, left, width, height}, this)
      } else {
        // if (this.name !== defaultWatcherName) console.log(`${this.name} Resize event suppressed`)
      }
    }
  }

  _onResizeEventThrottle = _throttle(this._onResizeEvent, 150, { 'leading': true, 'trailing': true })

  _resizeProps = () => ({[this.name]: this})

  registerNode = (node) => {
    this._node = node
    this._createWatcher()
  }

  _createWatcher = () => {
    if (this._node) {
      this.watcher = new WatchElementResize(this._node).on('resize', this.throttle ? this._onResizeEventThrottle : this._onResizeEvent)
    }
  }

  didMount = () => {
    // if (this.name !== defaultWatcherName) console.log(`${this.name} didMount ${this._node}`)
    this._createWatcher()
  }

  willUnmount = () => {
    // if (this.name !== defaultWatcherName) console.log(`${this.name} willUnmount  ${this._node}`)
    if (this.watcher) {
      if (this.name !== defaultWatcherName) console.log(`Remove resize watcher ${this.name}`)
      this.watcher.removeListener()
      this.watcher = undefined
    }
  }

}



export default (onResize, options) => Component => (props = {}) => {
  const resizeWatcher = new Watcher(({top, left, width, height}, watcher) => onResize({ top, left, width, height }, props, watcher), options)

  const MountDetector = compose(
    lifecycle({
      componentDidMount() {
        resizeWatcher.didMount()
      },
      componentWillUnmount() {
        resizeWatcher.willUnmount()
      },
    }),
  )(() => null)

  return (
    <div>
      <MountDetector />
      <Component {...props} {...resizeWatcher._resizeProps()} />
    </div>
  )
}

