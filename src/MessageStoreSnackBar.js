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
    onRequestClose={(reason) => {
      if (reason !== 'clickaway') {
        message.stop()
      }
    }}
    onClick={() => { message.stop() }}
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
      // To allow multiline, from here: https://github.com/callemall/material-ui/issues/3860
      height: 'auto',
      padding: `${spacing.desktopGutterLess}px ${spacing.desktopGutter}px`,
      whiteSpace: 'pre-line',

      ...typography.body,
      fontSize: 14,  // As per spec (desktop is 14 rather than usual 13)
    },
    style: desktopDevice
      ? {
        cursor: 'pointer',  // Since we click to close

        // Alternative positioning (on desktop), as per spec and how Google usually does it.
        // Also means when using a dark theme that it covers AppDrawer making it's appearance more obvious
        position: 'fixed',
        left: spacing.desktopGutter,
        bottom: spacing.desktopGutter,
        transform: open ? 'translate(0, 0)' : 'translate(0, ' + GUESS_MAX_HEIGHT + 'px)',  // Copied from MUI, x translate removed
      }
      : {
        cursor: 'pointer',
      }
  },
})

export default compose(
  withStyles(mapThemeToStyles),
  observer,
)(MessageStoreSnackBar)
