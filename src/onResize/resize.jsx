import React from 'react'
import debounce from 'lodash/debounce'

import WatchElementResizeDL from './core/resizeDL'
import WatchElementResize from './core/base'

const defaultWatcherName = 'resizeWatcher'

class Watcher {

  constructor(onResize, {name, old, echoOnly} = {name: defaultWatcherName, old: false, echoOnly: false}) {
    this.onResize = onResize
    this.name = name
    this.old = old
    this.echoOnly = echoOnly;
  }

  _onResizeEvent = debounce((evt) => {
    if (this.name !== defaultWatcherName || this.echoOnly) console.log(`${this.name}._onResizeEvent`, evt)
    const { top, left, width, height } = evt.element.offset
    if (width && height) {
      if (! this.echoOnly) {
        this.onResize({top, left, width, height}, this)
      } else {
        console.log(`${this.name} Resize event suppressed`)
      }
    }
  }, 150)

  _resizeProps = () => {
    const props = {[this.name]: this}
    if (this.name !== defaultWatcherName) console.log(`Create resize watcher ${this.name}`, props)
    return props
  }

  registerNode = (node) => {
    if (node) {
      this.watcher = new (! this.old ? WatchElementResize : WatchElementResizeDL)(node).on('resize', this._onResizeEvent)
    } else if (this.watcher) {
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

