//TODO: moved to @mindhive/documents

import React, { Component } from 'react'
import { SearchIcon as Icon } from '../Icon'
import { injectStylesSheet } from './SearchStyles'
import SearchSpinner from './SearchSpinner'

const SearchIcon = ({
  styles,
  hintText,
  fullWidth = false,
  searching = false,
}) => searching
  ? <SearchSpinner />
  : <Icon style={styles.icon} />

export default injectStylesSheet(SearchIcon)
