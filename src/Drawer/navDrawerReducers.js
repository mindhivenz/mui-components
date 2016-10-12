import { combineReducers } from 'redux'
import * as responsiveUiActions from '../responsiveUi/responsiveUiActions'
import { MEDIUM as dockedWindowWidth } from '../responsiveUi/windowWidth'
import * as navDrawerActions from './navDrawerActions'


export const docked = (state = true, action) => {
  switch (action.type) {
    case responsiveUiActions.WINDOW_WIDTH_CHANGED:
      return action.width >= dockedWindowWidth
    default:
      return state
  }
}

export const open = (state = null, action) => {
  switch (action.type) {
    case responsiveUiActions.WINDOW_WIDTH_CHANGED:
      // If the navDrawer becomes un-docked then set open back to null
      return action.width >= dockedWindowWidth ? null : state
    case navDrawerActions.SET_NAV_DRAWER_OPEN:
      return action.open
    default:
      return state
  }
}

export default combineReducers({
  docked,
  open,
})
