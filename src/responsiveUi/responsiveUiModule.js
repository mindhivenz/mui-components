import { windowWidthChangedAction } from './responsiveUiActions'
import * as windowWidth from './windowWidth'


class ResizeHandler {

  constructor() {
    this.resizeInterval = 166
    this.lastReportedWidth = undefined
    this.updateWidth()
    window.addEventListener('resize', this.handleResize, true)
  }

  handleResize = () => {
    clearTimeout(this.deferTimer)
    this.deferTimer = setTimeout(this.updateWidth, this.resizeInterval)
  }

  updateWidth = () => {
    const widthPx = window.innerWidth
    let width

    if (widthPx < 600) {
      width = windowWidth.X_SMALL
    } else if (widthPx < 960) {
      width = windowWidth.SMALL
    } else if (widthPx < 1280) {
      width = windowWidth.MEDIUM
    } else if (widthPx < 1920) {
      width = windowWidth.LARGE
    } else {
      width = windowWidth.X_LARGE
    }
    if (width !== this.lastReportedWidth) {
      windowWidthChangedAction(width)
      this.lastReportedWidth = width
    }
  }
}

export default () => ({
  resizeHandler: new ResizeHandler(),
})
