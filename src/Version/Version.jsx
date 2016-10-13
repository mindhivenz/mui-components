import React from 'react'

import withTheme from '../Theme/withTheme'
import connect from '../mobx/connect'


const Version = ({
  version,
  isSuperUser,
  styles,
  prepareStyles,
}) =>
  <div style={prepareStyles(styles)}>
    <div>&copy; Mindhive {version.copyrightYear}</div>
    <div>Version: {version.version}</div>
    {isSuperUser &&
      <div>{version.releaseOn} by {version.releaseBy}</div>
    }
  </div>

const calcStyles = ({
  version,
}) => ({
  ...version,
  fontSize: '12px',
  position: 'absolute',
  bottom: 10,
  left: 0,
  width: '100%',
})


const mapStoreToProps = ({
  viewer: { isSuperUser },
  version,
}) => ({
  version,
  isSuperUser,
})

export default connect(mapStoreToProps)(
  withTheme(Version, calcStyles)
)
