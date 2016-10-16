import { observable, autorun, computed, action } from 'mobx'
import { app } from '@mindhive/di'
import { WindowSize } from '../responsiveUi/windowMetrics'


const dockedWindowSize = WindowSize.MEDIUM

export class DrawerDomain {

  @observable docked = true
  @observable _open = null

  constructor() {
    autorun(() => {
      this.setDocked(app().windowMetricsDomain.size.ordinal >= dockedWindowSize.ordinal)
    })
  }

  @computed get open() {
    return this.docked ? null : this._open
  }

  @action toggle = () => {
    this._open = ! this._open
  }

  @action setDocked = (docked) => {
    this.docked = docked
  }

  @action setOpen = (open) => {
    this._open = open
  }
}
