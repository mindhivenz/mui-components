import { observable, computed, action } from 'mobx'
import { app } from '@mindhive/di'
import WindowSize from '../responsiveUi/WindowSize'


const dockedWindowSize = WindowSize.MEDIUM

export class DrawerDomain {

  @observable wantDocked = true
  @observable wantOpen = null

  constructor({
    inject: {
      windowMetricsDomain,
    } = app(),
  }) {
    this.windowMetricsDomain = windowMetricsDomain
  }

  @computed get canDock() {
    return this.windowMetricsDomain.size.ordinal >= dockedWindowSize.ordinal
  }

  @computed get docked() {
    return this.canDock && this.wantDocked
  }

  @computed get open() {
    return this.docked ? null : this.wantOpen
  }

  @action toggle = () => {
    if (this.canDock) {
      this.wantDocked = ! this.wantDocked
    } else {
      this.wantOpen = ! this.wantOpen
    }
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
