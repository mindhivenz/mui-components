import React from 'react'
import { observer } from 'mobx-react'
import { app } from '@mindhive/di'

import withStyles from './theme/withStyles'


const Version = ({
  inject: { versionStore } = app(),
  showInternalInfo,
  styles,
  prepareStyles,
}) =>
  <div style={prepareStyles(styles)}>
    <div>&copy; Mindhive {versionStore.copyrightYear}</div>
    <div>Version: {versionStore.version}</div>
    {showInternalInfo &&
      <div>{versionStore.releaseOn} by {versionStore.releaseBy}</div>
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

