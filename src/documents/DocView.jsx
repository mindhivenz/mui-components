import React from 'react'

import { ListItem } from 'material-ui/List'

import withStyleSheet from '../theme/withStyleSheet'
import withHover from '../hover/withHover'

const renderLeftIcon = (leftIcon, params) => {
  const { muiName } = leftIcon.type
  if (muiName === 'DocListIcon') {
    return React.cloneElement(leftIcon, params)
  }
  return leftIcon
}

const DocView = ({
  id,
  leftIcon,

  disabled,
  hovered,

  primaryText,
  secondaryText,
  leftAvatar,
  rightAvatar,
  rightIconButton,
  onTouchTap,
  styles,

  children,
}) =>
  <ListItem
    disableTouchRipple
    disableFocusRipple

    id={id}
    leftIcon={leftIcon && renderLeftIcon(leftIcon, { hovered, disabled })}
    primaryText={primaryText && <div style={styles.primaryText}>{primaryText}</div>}
    secondaryText={secondaryText && <div style={styles.secondaryText}>{secondaryText}</div>}
    leftAvatar={leftAvatar}
    rightAvatar={rightAvatar}
    rightIconButton={rightIconButton}
    onTouchTap={onTouchTap}
    style={styles.listItemStyle}
  >
    {children}
  </ListItem>

const mapThemeToStyles = ({
  docList: { primaryTextHoveredColor, primaryTextDisabledColor, secondaryTextDisabledColor },
  paper,
}, {
  disabled,
  hovered,
  containerStyle,
}) => {
  const hoverStyles = {
    zDepth: 1,
    ...paper,
    boxShadow: paper.zDepthShadows[0],
    borderRadius: '2px',
    transform: 'scale(1.015, 1)',
    position: 'relative',
  }
  return ({
    listItemStyle: {
      ...(hovered ? hoverStyles : {}),
      ...containerStyle,
    },
    primaryText: {
      color: disabled ? primaryTextDisabledColor
        : hovered ? primaryTextHoveredColor
        : 'inherit',
    },
    secondaryText: {
      color: disabled ? secondaryTextDisabledColor : 'inherit',
    },
  })
}

export default withHover()(
  withStyleSheet(mapThemeToStyles)(DocView)
)

