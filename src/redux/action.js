export const dispatch = (context, action) =>
  context.store.dispatch(action)

export const dispatchOf = (context, actionOrCreator) =>
  (...args) =>
    dispatch(
      context,
      typeof actionOrCreator === 'function' ? actionOrCreator(...args) : actionOrCreator
    )
