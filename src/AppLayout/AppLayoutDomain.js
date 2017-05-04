import { action, observable, computed } from 'mobx'
import { app } from '@mindhive/di'

export class AppLayoutDomain {

  @observable
  isFullScreenPage = null

  @observable
  navDrawerDomain = null

  constructor(navDrawerDomain) {
    this.init({navDrawerDomain})
  }

  @action
  init = ({
    navDrawerDomain,
    inject: {
      themeDomain: { muiTheme },
    } = app()
  }) => {
    this.isFullScreenPage = false
    this.appBarHeight = muiTheme.appBar.height
    this.navDrawerDomain = navDrawerDomain
  }

  @action
  setFullScreenPage = (fullScreenPage) => {
    this.isFullScreenPage = fullScreenPage
    this.navDrawerDomain.setAllowDocked(! this.isFullScreenPage)
  }

  @computed get allowDocked() {
    return ! this.isFullScreenPage
  }

  @computed get topOffset() {
    return this.isFullScreenPage ? 0 : this.appBarHeight
  }

  @computed get leftOffset() {
    return this.navDrawerDomain.actualWidth
  }

}
