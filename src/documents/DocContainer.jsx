import React from 'react'

import Paper from 'material-ui/Paper'

import SearchFilter from './SearchFilter'
import DocAddFab from './DocAddFab'

const DocContainer = ({
  addFab,
  search,
  children,
}) =>
  <Paper zDepth={1}>
    {addFab &&
      <DocAddFab addFab={addFab} />
    }
    {search ?
      <SearchFilter />
      :
      <div>&nbsp;</div>
    }
    {children}
  </Paper>

export default DocContainer

