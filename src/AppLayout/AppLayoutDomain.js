import { action, observable, computed, runInAction } from 'mobx'
import debounce from 'lodash/debounce'
import { app } from '@mindhive/di'

export class AppLayoutDomain {

  @observable
  isFullScreenPage = null

  @observable
  navDrawerDomain = null

  timer

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
  _setFullScreen = (fullScreenPage) => {
    // console.log('_setFullScreen', fullScreenPage)
    this.isFullScreenPage = fullScreenPage
    this.navDrawerDomain.setAllowDocked(!this.isFullScreenPage)
  }

  _setFullScreenTimer = (fullScreenPage) => {
    clearTimeout(this.timer)
    this.timer = setTimeout(
      () => {
        // console.log('TIMER')
        this._setFullScreen(fullScreenPage)
        this.was = undefined
        this.timer = undefined
      },
      1
    )
  }

  setFullScreenPage = (fullScreenPage, debounce=false) => {
    // console.log('isTimer', this.timer)
    if (!debounce || this.was === fullScreenPage) {
      clearTimeout(this.timer)
      this._setFullScreen(fullScreenPage)
      this.was = undefined
      this.timer = undefined
    } else if (!this.timer && !this.was) {
      this.was = this.isFullScreenPage
      this._setFullScreenTimer(fullScreenPage)
    } else if (this.timer && this.was !== fullScreenPage) {
      this._setFullScreenTimer(fullScreenPage)
    }
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
