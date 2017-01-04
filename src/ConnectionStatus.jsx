import { observer } from 'mobx-react'
import React from 'react'
import Chip from 'material-ui/Chip'
import transitions from 'material-ui/styles/transitions'
import { app } from '@mindhive/di'

import withTheme from './theme/withTheme'
import withHover from './hover/withHover'


const ConnectionStatus = ({
  domains: { connectionDomain } = app(),
  styles,
}) =>
  <Chip
    style={styles.container}
    labelStyle={styles.labelStyle}
    onTouchTap={connectionDomain.reconnect}
  >
    Can't connect the the server, will keep trying. Check your Internet connection.<br />
    {connectionDomain.hasPendingCalls &&
      <span>
        Changes you've made are waiting to be sent, and will be lost unless you reconnect.
      </span>
    }
    <span style={styles.click}>Click to try again</span>
  </Chip>

const mapThemeToStyles = ({
  connectionStatus,
  spacing,
  drawer,
}, {
  domains: { connectionDomain, layoutDomain } = app(),
  hovered,
}) => {
  const show = connectionDomain.connectionDown
  return ({
    container: {
      backgroundColor: connectionStatus.backgroundColor,
      opacity: show ? (hovered ? 1 : 0.75) : 0,
      textAlign: 'center',
      position: 'absolute',
      display: 'inline-block',
      padding: spacing.desktopGutterMini,
      bottom: spacing.desktopGutterLess,
      left: layoutDomain.leftOffset + spacing.desktopGutterLess,
      transition: transitions.easeOut(null, 'all', null),

      zIndex: 10000,
    },
    labelStyle: {
      fontSize: 12,
      color: connectionStatus.textColor,
      lineHeight: 'inherit',
    },
    click: {
      fontSize: 14,
      fontWeight: hovered ? 400 : 200,
      color: connectionStatus.clickColor,
      lineHeight: 'inherit',
    },
  })
}


export default
  withHover()(
    withTheme(mapThemeToStyles)(
      observer(ConnectionStatus)
    )
  )

