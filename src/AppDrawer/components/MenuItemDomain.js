import { observable, computed, action } from 'mobx'


export class  MenuItemDomain {

  @observable wantOpen = null
  @observable menuItems = null

  constructor({
    menuItems = null,
  }) {
    this.menuItems = menuItems
  }

  @computed get hasMenu() {
    return this.menuItems !== null
  }

  @computed get open() {
    return this.hasMenu && this.wantOpen
  }

  @action toggle = () => {
    if ( this.hasMenu ) {
      this.wantOpen = !this.wantOpen
    }
  }

  onTouchTap = () => {
    this.toggle()
  }

}
