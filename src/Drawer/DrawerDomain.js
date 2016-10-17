import { observable, autorun, computed, action } from 'mobx'
import { app } from '@mindhive/di'
import { WindowSize } from '../responsiveUi/windowMetrics'


const dockedWindowSize = WindowSize.MEDIUM

export class DrawerDomain {

  @observable canDock = true
  @observable wantDocked = true
  @observable wantOpen = null

  constructor() {
    autorun(() => {
      this.setCanDock(app().windowMetricsDomain.size.ordinal >= dockedWindowSize.ordinal)
    })
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

  @action setCanDock = (canDock) => {
    this.canDock = canDock
  }

  @action setWantOpen = (open) => {
    this.wantOpen = open
  }
}
