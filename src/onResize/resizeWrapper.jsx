/** Work in progress
 *  TODO: get wrapper to a) fill parent, or b) surround children
 *
 */
import React from 'react'
import { compose } from 'recompose'

import WatchElementResize from './core/base'
import withStyles from '../theme/withStyles'

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

const connectStyles = compose(withStyles(() => ({
  position: 'relative',
  overflow: 'hidden',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: '1px dashed yellow',
})))

const ResizeWrapper = connectStyles(({ resizeWatcher, styles, prepareStyles, children }) =>
  <div ref={resizeWatcher.registerNode} style={prepareStyles(styles)}>{children}</div>
)

export default (onResize, {wrap} = {wrap: true}) => Component => (props) => {
  const resizeWatcher = new Watcher((width, height) => onResize({ width, height }, props))
  if (wrap) {
    return (<ResizeWrapper resizeWatcher={resizeWatcher}><Component {...props} /></ResizeWrapper>)
  } else {
    return (<Component {...props} resizeWatcher={resizeWatcher}/>)
  }
}

