import { observer } from 'mobx-react'
import React from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import { app } from '@mindhive/di'


const ConnectionStatus = ({
  domains: { connectionDomain } = app(),
  vocab,
}) =>
  connectionDomain.connectionDown &&
    <div style={{ background: 'red', color: 'white' }}>
      Can't connect to {vocab.App}, will keep trying. Check your Internet connection.
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


const mapStateToProps = ({ vocab }) => ({
  vocab,
})

export default connect(mapStateToProps)(
  observer(
    ConnectionStatus
  )
)
