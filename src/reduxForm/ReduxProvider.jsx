import { app } from '@mindhive/di'
import React from 'react'
import { Provider } from 'react-redux'    // eslint-disable-line import/no-unresolved


export default ({ children }) =>
  <Provider store={app().reduxStore}>
    {children}
  </Provider>
