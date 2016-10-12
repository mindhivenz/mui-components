import { app } from '@mindhive/meteor'

export const dispatch = (action) =>
  app().store.dispatch(action)

export const dispatchOf = (actionOrCreator) =>
  (...args) =>
    dispatch(
      typeof actionOrCreator === 'function' ? actionOrCreator(...args) : actionOrCreator
    )
