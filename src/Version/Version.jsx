import React from 'react'
import { connect } from 'react-redux'
import { app } from '@mindhive/meteor'
import { observer } from 'mobx-react'

import { withTheme } from '@mindhive/ui-tools'


const Version = observer(({
  domains: { versionDomain } = app(),
  isSuperUser,
  styles,
  prepareStyles,
}) =>
  <div style={prepareStyles(styles)}>
    <div>&copy; Mindhive {versionDomain.copyrightYear}</div>
    <div>Version: {versionDomain.version}</div>
    {isSuperUser &&
      <div>{versionDomain.releaseOn} by {versionDomain.releaseBy}</div>
    }
  </div>
)

const Themed = withTheme(Version, (
    {
      version,
    }
  ) => (
  {
    ...version,
    fontSize: '12px',
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: '100%',
  })
)


const mapStateToProps = ({
  viewer: { isSuperUser },
}) => ({
  isSuperUser,
})

export default connect(mapStateToProps)(Themed)
