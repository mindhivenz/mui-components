import memoize from 'lru-memoize'


export const SELECT_NEW_ID = 'new'

// memoize so doesn't cause prop changes
export const selectedState = memoize(10)(
  (paramId) => {
    const isNew = paramId === SELECT_NEW_ID
    return {
      isNew,
      id: isNew ? null : paramId,
    }
  }
)
