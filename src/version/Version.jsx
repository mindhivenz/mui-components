import React from 'react'
import { observer } from 'mobx-react'
import { app } from '@mindhive/di'

import withTheme from '../theme/withTheme'


const Version = ({
  showInternalInfo,

  domains: { versionDomain } = app(),
  styles,
  prepareStyles,
}) =>
  <div style={prepareStyles(styles)}>
    <div>&copy; Mindhive {versionDomain.copyrightYear}</div>
    <div>Version: {versionDomain.version}</div>
    {showInternalInfo &&
      <div>{versionDomain.releaseOn} by {versionDomain.releaseBy}</div>
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

export default withTheme(observer(Version), calcStyles)

