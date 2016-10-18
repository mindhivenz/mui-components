import { observer } from 'mobx-react'
import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { app } from '@mindhive/di'


const ConnectionStatus = ({
  domains: { connectionDomain } = app(),
}) =>
  connectionDomain.connectionDown &&
    <div style={{ background: 'red', color: 'white' }}>
      Can't connect the the server, will keep trying. Check your Internet connection.
      {connectionDomain.hasPendingCalls &&
        <div>
          Changes you've made are waiting to be sent, and will be lost unless you reconnect.
        </div>
      }
      <div>
        <FlatButton
          label="Try again now"
          onTouchTap={connectionDomain.reconnect}
        />
      </div>
    </div>


export default
  observer(
    ConnectionStatus
  )

