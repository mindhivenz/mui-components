import { observable, computed, action, autorun } from 'mobx'
import { app } from '@mindhive/di'
import { WindowSize } from '../responsiveUi/windowMetrics'


const dockedWindowSize = WindowSize.MEDIUM

export class AppDrawerDomain {

  @observable wantDocked = true
  @observable wantOpen = null
  @observable wantExpanded = null
  storageKey

  constructor(params) {
    this.init(params)
  }

  @action init = ({
    domains: {
      windowMetricsDomain,
      themeDomain: { muiTheme },
    },
    options: {
      storageKey,
      wantExpanded = true,
    } = {},
  }) => {
    const { storage } = app()
    this.storageKey = storageKey
    this.windowMetricsDomain = windowMetricsDomain
    this.narrowWidth = muiTheme.drawer.narrowWidth
    this.expandedWidth = muiTheme.drawer.expandedWidth
    this.wantExpanded = wantExpanded
    if (storageKey) {
      const storedState = storage.read(storageKey)
      if (storedState) {
        this.wantDocked = storedState.wantDocked
        this.wantExpanded = storedState.wantExpanded
      }
      autorun('Save AppDrawerDomain state', () => {
        storage.write(storageKey, {
          wantDocked: this.wantDocked,
          wantExpanded: this.wantExpanded,
        })
      })
    }
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
