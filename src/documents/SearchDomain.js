import { action, observable, computed } from 'mobx'

export class SearchDomain {

  @observable
  searchText = ''

  constructor({source = [], filters = []}) {
    this.source = source
    this.filters = filters
  }

  @action
  onSearch = (searchText) => {
    this.searchText = searchText
  }

  @computed get filtered() {
    return this.source.filter(s => {
      let wanted = false
      this.filters.forEach(f => {
        wanted = f(s).toLowerCase().includes(this.searchText.toLowerCase())
      })
      return wanted
    })
  }

}

export default SearchDomain
