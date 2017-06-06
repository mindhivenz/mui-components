import React from 'react'
import debounce from 'lodash/debounce'

import WatchElementResize from './core/base'

const defaultWatcherName = 'resizeWatcher'

class Watcher {

  _width = undefined
  _height = undefined

  constructor(onResize, {name, echoOnly} = {name: defaultWatcherName, echoOnly: false}) {
    this.onResize = onResize
    this.name = name
    this.echoOnly = echoOnly
    if (this.name !== defaultWatcherName) console.log(`Create resize watcher ${this.name}`, this)
  }

  _onResizeEvent = debounce((evt) => {
    if (this.name !== defaultWatcherName || this.echoOnly) console.log(`${this.name}._onResizeEvent`, evt)
    const { top, left, width, height } = evt.element.offset
    if (width && height && (width !== this._width || height !== this._height)) {
      this._width = width
      this._height = height
      if (! this.echoOnly) {
        this.onResize({top, left, width, height}, this)
      } else {
        if (this.name !== defaultWatcherName) console.log(`${this.name} Resize event suppressed`)
      }
    }
  }, 150)

  _resizeProps = () => ({[this.name]: this})

  registerNode = (node) => {
    if (node) {
      this.watcher = new WatchElementResize(node).on('resize', this._onResizeEvent)
    } else if (this.watcher) {
      if (this.name !== defaultWatcherName) console.log(`Remove resize watcher ${this.name}`)
      this.watcher.removeListener()
    }
  }
}

export default (onResize, options) => Component => (props = {}) => {
  const resizeWatcher = new Watcher(({top, left, width, height}, watcher) => onResize({ top, left, width, height }, props, watcher), options)
  return (
    <Component {...props} {...resizeWatcher._resizeProps()} />
  )
}

