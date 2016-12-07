import React from 'react'

import withStyleSheet from '../theme/withStyleSheet'

const OutputStyledHtml = ({
  rawHtml,
  style,

  prepareStyles,
}) =>
  <div
    style={prepareStyles(style)}
    dangerouslySetInnerHTML={{ __html: rawHtml }}
  />


export default withStyleSheet()(OutputStyledHtml)

