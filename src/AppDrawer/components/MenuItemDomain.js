import { observable, computed, action } from 'mobx'

const menuItemHeight = 48

export class  MenuItemDomain {

  @observable wantOpen = false
  @observable menuItems = null

  @action update({ menuItems }) {
    // console.log('SubMenu.update', menuItems)
    this.menuItems = menuItems
    // console.log('after update', this.menuItems)
  }

  @computed get hasMenu() {
    // console.log('hasMenu', this.menuItems)
    return this.menuItems
  }

  @computed get menuLength() {
    // console.log('menuLength', this.menuItems ? this.menuItems.length : 0)
    return this.menuItems ? this.menuItems.length : 0
  }

  @computed get open() {
    // console.log('open', this.hasMenu && this.wantOpen)
    return this.hasMenu && this.wantOpen
  }

  @computed get height() {
    var result = menuItemHeight
    if (this.open) {
      result += (this.menuLength * menuItemHeight)
    }
    // console.log('length', this.menuLength)
    // console.log('height', result)
    return result
  }

  @action toggle = () => {
    if ( this.hasMenu ) {
      this.wantOpen = !this.wantOpen
    }
    // console.log('SubMenu.toggle', this.open)
  }

  onTouchTap = () => {
    this.toggle()
    // console.log('SubMenu.onTouchTap', this.open)
  }

}
