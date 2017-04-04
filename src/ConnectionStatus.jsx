import { observer } from 'mobx-react'
import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { app } from '@mindhive/di'
import compose from 'recompose/compose'

import Icon from './Icon'
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
  inject: { connectionDomain, observableClock } = app(),
  styles,
  prepareStyles,
  theme: ignoreTheme,
  ...props,
}) =>
  connectionDomain.viewerWaitingTooLong ?
    <FlashOffline {...props}>
      <CircularProgress {...styles.circularProgressProps} {...props} />
    </FlashOffline>
    :
    connectionDomain.callRunningTooLong ?
      <FlashOffline {...props}>
        <Icon ligature="cloud_upload" {...props} />
      </FlashOffline>
      :
      connectionDomain.connectionDown ?
        <Icon ligature="cloud_off" {...props} />
        :
        <div style={prepareStyles(styles.placeholder)} />

const mapThemeToStyles = ({
  spacing,
}) => ({
  placeholder: {
    width: spacing.iconSize,
    height: spacing.iconSize,
  },
  circularProgressProps: {
    size: spacing.iconSize,
  },
})

export default compose(
  withStyles(mapThemeToStyles),
  observer,
)(ConnectionStatus)
