import { dispatchOf } from '../redux/action'


export const WINDOW_WIDTH_CHANGED = 'WINDOW_WIDTH_CHANGED'

export const windowWidthChangedAction = (context) => dispatchOf(context, width => ({
  type: WINDOW_WIDTH_CHANGED,
  width,
}))
