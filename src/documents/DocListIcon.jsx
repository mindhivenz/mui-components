import React from 'react'

import withStyleSheet from '../theme/withStyleSheet'

const DocListIcon = ({
  styles,
  children,

  style,  // MUI

  color, // eslint-disable-line no-unused-vars
  theme, // eslint-disable-line no-unused-vars
  prepareStyles, // eslint-disable-line no-unused-vars
  hovered, // eslint-disable-line no-unused-vars
}) =>
  React.cloneElement(React.Children.only(children), { style: Object.assign({}, style, styles) })

const mapThemeToStyles = ({
  docList: {
    iconColor,
    iconHoveredColor,
    iconHoveredOpacity,
  },
}, {
  hovered,
  disabled,
  color,
  hoverColor,
}) => {
  let actualColor = iconColor
  if (! disabled) {
    actualColor = hovered ? hoverColor || iconHoveredColor : color || iconColor
  }
  return ({
    color: actualColor,
    opacity: hovered ? iconHoveredOpacity : 1,
  })
}


export default
withStyleSheet(mapThemeToStyles)(DocListIcon)

