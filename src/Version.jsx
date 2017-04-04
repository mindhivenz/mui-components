import React from 'react'
import { observer } from 'mobx-react'
import { app } from '@mindhive/di'

import withStyles from './theme/withStyles'


const Version = ({
  showInternalInfo,

  inject: { versionDomain } = app(),
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

const mapThemeToStyles = ({
  version,
}) => ({
  ...version,
  fontSize: '12px',
  position: 'absolute',
  bottom: 10,
  left: 0,
  width: '100%',
})

export default
  withStyles(mapThemeToStyles)(
    observer(Version)
  )

