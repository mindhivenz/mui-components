import React from 'react'

import WatchElementResize from './core/resizeDL'

class Watcher {

  constructor(onResize) {
    this.onResize = onResize
  }

  _onResizeEvent = (evt) => {
    console.log('onResizeDL._onResizeEvent', evt)
    const { top, left, width, height } = evt.element.offset
    if (width && height) this.onResize({top, left, width, height})
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
  const resizeWatcher = new Watcher(({top, left, width, height}) => onResize({ top, left, width, height }, props))
  return (
    <Component {...props} resizeWatcher={resizeWatcher} />
  )
}

