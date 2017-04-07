import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import compose from 'recompose/compose'
import { observer } from 'mobx-react'
import { app } from '@mindhive/di'

import WindowSize from './responsiveUi/WindowSize'
import withStyles from './theme/withStyles'


const MessageStoreSnackBar = ({
  messageStore,
  styles,
  message = messageStore.firstMessage,
}) =>
  <Snackbar
    autoHideDuration={5000}
    message={message ? message.message : ''}
    action={message && message.actionLabel}
    onActionTouchTap={message && message.onAction}
    open={message != null}
    onRequestClose={() => message.stop()}
    {...styles.snackbarProps}
  />

const GUESS_MAX_HEIGHT = 100  // Because we allow multiline

const mapThemeToStyles = (
  {
    inject: { windowMetricsDomain } = app(),
    desktopDevice = windowMetricsDomain.size.ordinal >= WindowSize.MEDIUM.ordinal,
    typography,
    spacing,
  },
  {
    messageStore,
    open = messageStore.firstMessage != null,
  },
) => ({
  snackbarProps: {
    bodyStyle: {
      height: 'auto',
      padding: `${spacing.desktopGutterLess}px ${spacing.desktopGutter}px`,
      ...typography.body,
      fontSize: 14,  // As per spec
      whiteSpace: 'pre-line',
    },
    style: desktopDevice
      ? {
        position: 'fixed',
        left: spacing.desktopGutter,
        bottom: spacing.desktopGutter,
        transform: open ? 'translate(0, 0)' : 'translate(0, ' + GUESS_MAX_HEIGHT + 'px)',  // Copied from MUI, x translate removed
      }
      : {}
  },
})

export default compose(
  withStyles(mapThemeToStyles),
  observer,
)(MessageStoreSnackBar)
