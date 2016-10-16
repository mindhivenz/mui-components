import { observable, action } from 'mobx'
import { WindowSize } from './windowMetrics'


class WindowMetricsDomain {

  @observable size

  constructor() {
    this.resizeInterval = 166
    this.updateWidth()
    window.addEventListener('resize', this.handleResize, true)
  }

  handleResize = () => {
    clearTimeout(this.deferTimer)
    this.deferTimer = setTimeout(this.updateWidth, this.resizeInterval)
  }

  @action updateWidth = () => {
    const widthPx = window.innerWidth
    this.size = WindowSize.enumValues.find(s => ! s.breakpoint || widthPx < s.breakpoint)
  }
}

export default () => ({
  windowMetricsDomain: new WindowMetricsDomain(),
})
