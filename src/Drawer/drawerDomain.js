import { observable, autorun, computed, action } from 'mobx'
import { MEDIUM as dockedWindowWidth } from '../responsiveUi/windowWidth'


class DrawerDomain {

  @observable docked
  @observable isOpen

  constructor(resizeHandler) {
    this.resizeHandler = resizeHandler
    this._init(null, true)
    autorun(() => {
      this.setOpen(this.resizeHandler.width >= dockedWindowWidth)
    })
  }

  @action _init(open, docked) {
    this.isOpen = open
    this.docked = docked
  }

  @computed get open() {
    console.log('DrawerDomain')
    console.log(this.isOpen)
    return this.isOpen
  }

  @action toggle() {
    this.isOpen = ! this.isOpen
  }

  @action setOpen(open) {
    console.log('DrawerDomain')
    console.log(`open: ${open}`)
    this.isOpen = open
  }

}

export default ({resizeHandler}) => ({
  drawer: new DrawerDomain(resizeHandler),
})
