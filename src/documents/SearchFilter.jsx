import React, { Component } from 'react'

import TextField from 'material-ui/TextField'

import withTheme from '../theme/withTheme'
import { SearchIcon } from '../Icon'

class SearchFilter extends Component {

  state = {
    searchText: '',
  }

  handleChange = (event) => {
    const searchText = event.target.value

    // Make sure that we have a new searchText.
    // Fix an issue with a Cordova Webview
    if (searchText === this.state.searchText) {
      return
    }

    this.setState({
      searchText,
    }, () => {
      this.props.onSearch(searchText)
    })
  }

  render() {
    const {
      styles,
      hintText,
    } = this.props
    const { searchText } = this.state
    return (
      <div style={styles.search}>
        <SearchIcon style={styles.search.icon} />
        <TextField
          ref="searchTextField"
          autoComplete="off"
          value={searchText}
          style={styles.search.textField}
          hintText={hintText || 'Filter list'}
          onChange={this.handleChange}
          autoFocus
        />
      </div>
    )
  }


}

const mapThemeToStyles = ({
  spacing,
  search,
}) => ({
  search: {
    ...search,
    icon: {
      ...search,
      top: spacing.desktopGutterMini,
      margin: `0 ${spacing.desktopGutterMini / 2}px 0 ${spacing.desktopGutterLess}px`,
    },
    textField: {
      ...search,
      left: `${spacing.desktopGutterMore}px`,
    },
    top: spacing.desktopGutterLess,
    marginBottom: `${spacing.desktopGutterLess}px`,
  },
})

export default withTheme(SearchFilter, mapThemeToStyles)
