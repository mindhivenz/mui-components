import { observable, action, computed, autorun } from 'mobx'
import StoreLifecycle from '@mindhive/mobx/StoreLifecycle'

class PageHeaderDomain extends StoreLifecycle {

  @observable _wantHidden = false
  @observable description = undefined
  @observable title = undefined

  @observable showHeader

  constructor(layoutDomain, options) {
    super()
    this.layoutDomain = layoutDomain
    this.init(options)
  }
  @action init = ({ showHeader } = {}) => {
    this.showHeader = showHeader !== undefined ? showHeader : true
  }


  @computed get hidden() {
    return this._wantHidden
  }

  @action setHidden = (hidden) => {
    this._wantHidden = hidden
  }

  @action update = (title, description) => {
    this.title = title
    this.description = description
  }
}

export default options => {
  console.log('PageHeaderDomain', options)
  return ({ layoutDomain }) => ({
    pageHeaderDomain: new PageHeaderDomain(layoutDomain, options),
  })
}
