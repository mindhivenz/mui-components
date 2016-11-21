import { observable, computed, action } from 'mobx'
import { WindowSize } from '../responsiveUi/windowMetrics'


const dockedWindowSize = WindowSize.MEDIUM

export class DrawerDomain {

  @observable wantDocked = true
  @observable wantOpen = null
  @observable wantExpanded = true

  constructor(params) {
    this.init(params)
  }

  @action init = ({
    domains: {
      windowMetricsDomain,
      themeDomain: { muiTheme },
    },
    options: {
      wantExpanded = true,
    } = {},
  }) => {
    this.windowMetricsDomain = windowMetricsDomain
    this.narrowWidth = muiTheme.drawer.narrowWidth
    this.expandedWidth = muiTheme.drawer.expandedWidth
    this.wantExpanded = wantExpanded
  }

  @computed get canDock() {
    return this.windowMetricsDomain.size.ordinal >= dockedWindowSize.ordinal
  }

  @computed get docked() {
    return this.canDock && this.wantDocked
  }

  @computed get expanded() {
    return this.wantExpanded
  }

  @computed get open() {
    return this.docked ? null : this.wantOpen
  }

  @computed get translateWidth() {
    return this.open ? -this.expandedWidth : 0
  }

  @computed get actualWidth() {
    if (! this.canDock) return 0
    if (this.docked || this.wantOpen) {
      return this.expanded ? this.expandedWidth : this.narrowWidth
    }
    return 0
  }

  @action toggle = () => {
    if (this.canDock) {
      this.wantDocked = ! this.wantDocked
    } else {
      this.wantOpen = ! this.wantOpen
    }
  }

  @action toggleExpand = () => {
    this.wantExpanded = ! this.wantExpanded
  }


  onItemTouch = (itemOnTouchTap) => {
    if (! this.docked) {
      this.setWantOpen(false)
    }
    itemOnTouchTap && itemOnTouchTap()
  }

  onTouchTap = () => {
    if (! this.docked) {
      this.setWantOpen(false)
    }
  }

  @action setWantOpen = (open) => {
    this.wantOpen = open
  }
}
