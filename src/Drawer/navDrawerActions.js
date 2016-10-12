import { dispatchOf } from '../redux/action'


export const SET_NAV_DRAWER_OPEN = 'SET_NAV_DRAWER_OPEN'

export const setNavDrawerOpenAction = dispatchOf(open => ({
  type: SET_NAV_DRAWER_OPEN,
  open,
}))
