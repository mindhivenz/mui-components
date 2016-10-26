import {
  observable,
  action,
} from 'mobx'


export class InlineFabDomain {

  @observable position = 0

  @action setPosition(position) {
    this.position = position
  }


}

export default () => ({
  inlineFabDomain: new InlineFabDomain(),
})
