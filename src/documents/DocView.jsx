import React from 'react'

import { ListItem } from 'material-ui/List'

import withTheme from '../theme/withTheme'
import withHover from '../hover/withHover'


const DocView = ({
  id,
  leftIcon,

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
    leftIcon={leftIcon && React.cloneElement(leftIcon, { style: styles.icon })}
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

const calcStyles = ({
  docList: { icon, primaryText, secondaryText },
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
    icon: {
      ...icon,
      ...(hovered ? icon.hovered : {}),
    },
    primaryText: {
      ...(disabled
        ? primaryText.disabled
        : hovered
        ? primaryText.hovered
        : {}),
    },
    secondaryText: disabled ? secondaryText.disabled : {},
  })
}

export default withHover()(withTheme(DocView, calcStyles))

