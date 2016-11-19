import { action, observable, computed } from 'mobx'

export class AppLayoutDomain {

  @observable
  navDrawerDomain = null

  constructor(navDrawerDomain) {
    this.init(navDrawerDomain)
  }

  @action
  init = (navDrawerDomain) => {
    this.navDrawerDomain = navDrawerDomain
  }

  @computed get leftOffset() {
    return this.navDrawerDomain.actualWidth
  }

}
