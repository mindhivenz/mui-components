import { observable, autorun, computed, action } from 'mobx'
import { MEDIUM as dockedWindowWidth } from '../responsiveUi/windowWidth'


class DrawerDomain {

  @observable docked
  @observable _open

  constructor(resizeHandler) {
    this.resizeHandler = resizeHandler
    this._init(null, true)
    autorun(() => {
      this.setDocked(this.resizeHandler.width >= dockedWindowWidth)
      this.setOpen(this.docked ? null : this._open)
    })
  }

  @action _init(open, docked) {
    this._open = open
    this.docked = docked
  }

  @computed get open() {
    console.log('DrawerDomain')
    console.log(this._open)
    return this._open
  }

  @action toggle() {
    this._open = ! this._open
  }

  @action setDocked(docked) {
    console.log('DrawerDomain')
    console.log(`open: ${docked}`)
    this.docked = docked
  }

  @action setOpen(open) {
    console.log('DrawerDomain')
    console.log(`open: ${open}`)
    this._open = open
  }

}

export default ({resizeHandler}) => ({
  drawer: new DrawerDomain(resizeHandler),
})
