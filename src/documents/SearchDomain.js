import { action, observable, computed } from 'mobx'



class SearchDomain {

  @observable
  searchText = ''

  constructor({items = [], retrievers = []}) {
    this.items = items
    this.retrievers = retrievers
  }

  @action
  onSearch = (searchText) => {
    this.searchText = searchText
  }

  @computed get results() {
    return this.items.filter(item =>
      this.retrievers.reduce(
        (includeItem, retrieve) => includeItem || retrieve(item).toLowerCase().includes(this.searchText.toLowerCase()),
        false
      )
    )
  }

}

export default SearchDomain
