import {
  observable,
  action,
} from 'mobx'


export class InlineFabDomain {

  @observable position = 0
  @observable hovered = false

  @action setPosition(position) {
    this.position = position
  }

  @action setHovered(hovered) {
    this.hovered = hovered
  }


}

export default () => ({
  inlineFabDomain: new InlineFabDomain(),
})
