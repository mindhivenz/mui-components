import { observer } from 'mobx-react'
import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { app } from '@mindhive/di'
import compose from 'recompose/compose'

import { Icon } from './Icon'
import withStyles from './theme/withStyles'


const OFFLINE_FLASH_SECONDS = 1.0

const flashOn = (date) =>
  (Math.floor(date.getTime() / 1000 / OFFLINE_FLASH_SECONDS) % 2) === 0

const FlashOffline = observer(({
  inject: { connectionDomain, observableClock } = app(),
  children,
  ...props,
}) =>
  connectionDomain.connectionDown && flashOn(observableClock(1)) ?
    <Icon ligature="cloud_off" {...props} />
    :
    children
)

const ConnectionStatus = ({
  inject: { connectionDomain } = app(),
  reserveSpace,
  styles,
  prepareStyles,
  theme: ignoreTheme,
  size: ignoreSize,
  ...props,
}) =>
  connectionDomain.viewerWaitingTooLong ?
    <FlashOffline {...styles.iconProps} {...props}>
      <CircularProgress {...styles.circularProgressProps} {...props} />
    </FlashOffline>
    :
    connectionDomain.callRunningTooLong ?
      <FlashOffline {...styles.iconProps} {...props}>
        <Icon ligature="cloud_upload" {...styles.iconProps} {...props} />
      </FlashOffline>
      :
      connectionDomain.connectionDown ?
        <Icon ligature="cloud_off" {...styles.iconProps} {...props} />
        :
        reserveSpace ?
          <div style={prepareStyles(styles.placeholder)} />
          :
          null

const mapThemeToStyles = (
  { spacing },
  { size = spacing.iconSize },
) => ({
  placeholder: {
    width: size,
    height: size,
    display: 'inline-block',
  },
  iconProps: {
    fontSize: size,
  },
  circularProgressProps: {
    size,
    thickness: 2.5,
  },
})

export default compose(
  withStyles(mapThemeToStyles),
  observer,
)(ConnectionStatus)
