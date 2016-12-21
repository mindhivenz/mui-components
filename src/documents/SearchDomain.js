import { action, observable, computed } from 'mobx'



class SearchDomain {

  @observable
  searchText = ''

  constructor({items = [], retrievers}) {
    this.items = items
    this.retrievers = retrievers
  }

  @action
  onSearch = (searchText) => {
    this.searchText = searchText
  }

  @computed get itemsTexts() {
    return this.items.map(item =>
      this.retrievers.map(r => r(item).toLowerCase())
    )
  }

  @computed get results() {
    const searchText = this.searchText.toLowerCase()
    return this.items.filter((item, i) => this.itemsTexts[i].some(itemText => itemText.includes(searchText)))
  }

}

export default SearchDomain
