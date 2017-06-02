import React from 'react'

import WatchElementResize from './core/base'

class Watcher {

  constructor(onResize) {
    this.onResize = onResize
  }

  _onResizeEvent = (evt) => {
    const { width, height } = evt.element.offset
    if (width && height) this.onResize(width, height)
  }

  registerNode = (node) => {
    if (node) {
      this.watcher = new WatchElementResize(node).on('resize', this._onResizeEvent)
    } else if (this.watcher) {
      this.watcher.removeListener()
    }

  }
}

export default onResize => Component => (props) => {
  const resizeWatcher = new Watcher((width, height) => onResize({ width, height }, props))
  return (
    <Component {...props} resizeWatcher={resizeWatcher} />
  )
}

