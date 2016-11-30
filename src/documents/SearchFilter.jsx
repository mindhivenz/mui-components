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
      fullWidth = false,
    } = this.props
    const { searchText } = this.state
    return (
      <div style={styles.container}>
        <SearchIcon style={styles.icon} />
        <TextField
          ref="searchTextField"
          autoComplete="off"
          value={searchText}
          style={styles.textField}
          hintText={hintText || 'Filter list'}
          onChange={this.handleChange}
          autoFocus
          fullWidth={fullWidth}
        />
      </div>
    )
  }


}

const mapThemeToStyles = ({
  spacing,
  search: { color },
}, {
  style = {},
  isList = true,
}) => ({
  container: {
    boxSizing: 'border-box',
    ...style.container,
  },
  icon: {
    color,
    padding: `${spacing.desktopGutterLess}px`,
    paddingBottom: `${spacing.desktopGutterMini}px`,
    ...style.icon,
  },
  textField: {
    color,
    top: -spacing.desktopGutterMini,
    left: isList ? `${spacing.desktopGutterLess}px` : 0,
    ...style.textField,
  },
})

export default withTheme(SearchFilter, mapThemeToStyles)
