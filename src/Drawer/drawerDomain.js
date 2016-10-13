import { observable, autorun, computed, action } from 'mobx'
import { MEDIUM as dockedWindowWidth } from '../responsiveUi/windowWidth'


class DrawerDomain {

  @observable docked
  @observable isOpen

  constructor(resizeHandler) {
    // this.disposer = autorun(() => console.log(resizeHandler.width));
    // this.resizeHandler = resizeHandler
    this._init(null, true)
  }

  @action _init(open, docked) {
    this.isOpen = open
    this.docked = docked
  }

  @computed open() {
    console.log('DrawerDomain')
    console.log(this.resizeHandler.width)
    return this.resizeHandler.width >= dockedWindowWidth ? null : this.isOpen
  }

  @action toggle() {
    this.isOpen = ! this.isOpen
  }

  @action setOpen(open) {
    this.isOpen = open
  }

}

export default ({resizeHandler}) => ({
  drawer: new DrawerDomain(resizeHandler),
})
