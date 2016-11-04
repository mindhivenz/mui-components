import React from 'react'

import withStyleSheet from '../theme/withStyleSheet'


const NoDocsLabel = ({ hideWhenEmpty, children, styles, prepareStyles }) =>
  ! hideWhenEmpty ? <div style={prepareStyles(styles.noDocuments)}>{children}</div> : null

const mapThemeToStyles = ({
  palette,
  typography,
  appBar,
  spacing,
}) => ({
  noDocuments: {
    color: palette.disabledColor,
    fontWeight: typography.fontWeightMedium,
    textAlign: 'center',
    padding: appBar.height,
    fontSize: spacing.desktopGutterMore,
  },
})

export default withStyleSheet(mapThemeToStyles)(NoDocsLabel)
