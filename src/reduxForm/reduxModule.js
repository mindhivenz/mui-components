import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'


export default () => {
  let middleware
  if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    middleware = window.devToolsExtension()
  }
  return {
    reduxStore: createStore(combineReducers({ form: formReducer }), {}, middleware),
  }
}
