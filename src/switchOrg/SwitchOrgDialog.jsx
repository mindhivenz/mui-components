import React from 'react'
import { observer } from 'mobx-react'
import { app } from '@mindhive/di'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Dialog from '../Dialog/Dialog'


const SwitchOrgDialog = ({
  domains: { switchOrgDomain } = app(),
}) =>
  <Dialog
    open={switchOrgDomain.dialogOpen}
    title="Switch Organisation"
    description={switchOrgDomain.canSwitch ?
      switchOrgDomain.description
      : switchOrgDomain.loading ?
        'Loading...'
        : 'No organisations available to switch to'
    }
    primaryButton={switchOrgDomain.canSwitch && {
      label: 'Switch',
      onTouchTap: () => switchOrgDomain.handleSwitch(),
      disabled: switchOrgDomain.pristine,
    }}
    secondaryButton={{
      label: 'Cancel',
      onTouchTap: () => switchOrgDomain.cancel(),
    }}
  >
    {switchOrgDomain.canSwitch &&
      <SelectField
        floatingLabelText="Switch to"
        value={switchOrgDomain.defaultOrgId}
        onChange={(e, i, value) => switchOrgDomain.handleChange(value)}
        fullWidth
      >
        {switchOrgDomain.orgs && switchOrgDomain.filteredOrgs.map(org =>
          <MenuItem
            key={org._id}
            value={org._id}
            primaryText={org.name}
          />
        )}
      </SelectField>
    }
  </Dialog>

export default observer(SwitchOrgDialog)
