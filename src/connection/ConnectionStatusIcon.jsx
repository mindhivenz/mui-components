import React from 'react'
import { observer } from 'mobx-react'
import CircularProgress from 'material-ui/CircularProgress'
import { app } from '@mindhive/di'
import compose from 'recompose/compose'

import { Icon } from '../Icon'
import withStyles from '../theme/withStyles'


const OFFLINE_FLASH_SECONDS = 1.0

const flashOn = (date) =>
  (Math.floor(date.getTime() / 1000 / OFFLINE_FLASH_SECONDS) % 2) === 0

const FlashOffline = observer(({
  inject: { connectionStore, observableClock } = app(),
  children,
  ...props,
}) =>
  connectionStore.connectionDown && flashOn(observableClock(1)) ?
    <Icon ligature="cloud_off" {...props} />
    :
    children
)

const onClick = () => {
  const { connectionStore, systemMessageStore } = app()
  if (connectionStore.connectionDown) {
    systemMessageStore.addMessage({
      message: 'You are offline, attempting to reconnect...',
      actionLabel: 'Connect',
      onAction: () => { connectionStore.reconnect() },
      cancelWhen: () => ! connectionStore.connectionDown,
    })
  } else if (connectionStore.callInProgress) {
    systemMessageStore.addMessage({
      message: 'This is taking longer than usual, still trying...',
      cancelWhen: () => ! connectionStore.callInProgress,
    })
  } else if (connectionStore.backgroundComms) {
    systemMessageStore.addMessage({
      message: 'Your work is being uploaded to the cloud',
      cancelWhen: () => ! connectionStore.backgroundComms,
    })
  }
}

const ConnectionStatus = ({
  inject: { connectionStore } = app(),
  reserveSpace,
  styles,
  prepareStyles,
  theme: ignoreTheme,
  size: ignoreSize,
  style: ignoreStyle,
  ...otherProps,
}) => {
  const props = {
    onClick,
    ...otherProps,
  }
  return connectionStore.callInProgress ?
    <FlashOffline {...styles.iconProps} {...props}>
      <CircularProgress {...styles.circularProgressProps} {...props} />
    </FlashOffline>
    :
    connectionStore.backgroundComms ?
      <FlashOffline {...styles.iconProps} {...props}>
        <Icon ligature="cloud_upload" {...styles.iconProps} {...props} />
      </FlashOffline>
      :
      connectionStore.connectionDown ?
        <Icon ligature="cloud_off" {...styles.iconProps} {...props} />
        :
        reserveSpace ?
          <div style={prepareStyles(styles.placeholder)}/>
          :
          null
}

const mapThemeToStyles = (
  { spacing },
  {
    size = spacing.iconSize,
    style = {},
  },
) => ({
  placeholder: {
    width: size,
    height: size,
    display: 'inline-block',
    ...style,
  },
  iconProps: {
    style: {
      fontSize: size,
      cursor: 'pointer',
      ...style,
    },
  },
  circularProgressProps: {
    size,
    thickness: size / 11,
    style: {
      cursor: 'pointer',
      ...style,
    },
  },
})

export default compose(
  withStyles(mapThemeToStyles),
  observer,
)(ConnectionStatus)
