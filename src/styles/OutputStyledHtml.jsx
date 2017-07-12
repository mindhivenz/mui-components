//TODO: moved to @mindhive/styles

import React from 'react'
import withStyles from '../theme/withStyles'

const OutputStyledHtml = ({
  rawHtml,
  style,

  prepareStyles,
}) =>
  <div
    style={prepareStyles(style)}
    dangerouslySetInnerHTML={{ __html: rawHtml }}
  />


export default withStyles()(OutputStyledHtml)

