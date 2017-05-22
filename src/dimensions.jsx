import React from 'react'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'

export default Component =>
  props => <AutoSizer>
    {({ height, width }) =>
      <Component {...props} containerHeight={height} containerWidth={width} />
    }
  </AutoSizer>
