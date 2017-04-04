import { observable, computed, action, autorun } from 'mobx'
import { app } from '@mindhive/di'
import { DrawerDomain } from '../Drawer/DrawerDomain'


export class AppDrawerDomain extends DrawerDomain {

  @observable wantExpanded = null
  storageKey

  constructor({
    inject: {
      windowMetricsDomain,
      themeDomain: { muiTheme },
    } = app(),
    options: {
      storageKey = null,
      wantExpanded = true,
    } = {},
  }) {
    super({ inject: { windowMetricsDomain } })
    const { storage } = app()
    this.storageKey = storageKey
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

  @computed get expanded() {
    return this.wantExpanded
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

  @action toggleExpand = () => {
    this.wantExpanded = ! this.wantExpanded
  }

  onItemTouch = (itemOnTouchTap) => {
    if (! this.docked) {
      this.setWantOpen(false)
    }
    itemOnTouchTap && itemOnTouchTap()
  }
}
