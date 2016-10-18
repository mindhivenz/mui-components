export const pluralise = (label, count) => `${label}${count !== 1 ? 's' : ''}`

export const supplant = (str, dict) =>
  str.replace(/{([^{}]*)}/g,
    (a, b) => {
      const r = dict[b]
      return typeof r === 'string' || typeof r === 'number' ? r : a
    }
  )

export const cleanProps = ({
  dispatch, theme, prepareStyles, onKeyboardFocus, // eslint-disable-line no-unused-vars
  ...other,
}) => other
