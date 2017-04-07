import { app } from '@mindhive/di'
import withStyles from '../../theme/withStyles'
import { trans as transitions } from '../../styles/animations'
import { observer } from 'mobx-react'

export default ({
  palette,
  colorManipulator,
  typography,
  spacing,

  drawer,
}) => ({
  drawer: {
    expandedWidth: drawer.width,
    narrowWidth: spacing.desktopDrawerMenuItemHeight + 8,
    backgroundColor: palette.darkSecondary1Color,
    menuItem: {
      color: palette.secondary1Color,
      fontWeight: typography.fontWeight100,
      fontSize: 18,
    },
    active: {
      fontWeight: typography.fontWeight700,
    },
    activeIcon: {
      color: 'white',
      // color: colorManipulator.lighten(palette.primary1Color, 0.4),
      transition: transitions.cubicAll,
      transform: 'scale(1.5, 1.5) translate(1px, 1px)',
    },
    divider: {
      zIndex: 10000,
      backgroundColor: colorManipulator.darken(palette.darkSecondary1Color, 0.5),
    },
    docked: {
      top: spacing.desktopKeylineIncrement,
    },
  },
})


const mapThemeToStyles = ({
  colorManipulator,
  appBar,
  drawer,
},
  {
    active,
    hovered,
    menuItemHovered,
    hideWhenExpanded,
    hideWhenNarrow,
    inject: { navDrawerDomain: domain } = app(),
  }
) => {
  const menuItemRootStyles = {
    backgroundColor: hovered ? colorManipulator.darken(drawer.backgroundColor, 0.1) : drawer.backgroundColor,
  }
  const showing = domain.expanded || hovered
  const translateDistance = domain.expanded ? drawer.expandedWidth : drawer.narrowWidth
  const transform = domain.docked || domain.open ? 'translate(0, 0)' : `translate(-${translateDistance}px, 0)`
  return ({
    expandVisible: {
      transition: transitions.cubicAll,
      opacity: domain.expanded ? (hideWhenExpanded ? 0 : 1) : (hideWhenNarrow ? 0 : 1),
    },
    drawer: {
      position: 'fixed',
      left: 0,
      top: 0,
      width: domain.expanded ? drawer.expandedWidth : drawer.narrowWidth,
      backgroundColor: drawer.backgroundColor,
      height: `calc(100% - ${appBar.height}px)`,
      marginTop: appBar.height,
      // left: domain.open || domain.docked ? 0 : -drawer.expandedWidth,
      transition: transitions.cubicAll,
      transform,
    },
    divider: drawer.divider,
    menuItem: menuItemRootStyles,
    icon: {
      ...drawer.menuItem,
      ...(active ? drawer.activeIcon : {}),
      transform: `translate(3px, 3px) ${active ? drawer.activeIcon.transform : ''}`,
    },
    menuLabel: {
      container: {
        display: 'inline-block',
      },
    },
    menuItemFlyOut: {
      container: {
        position: 'fixed',
        zIndex: 1390,
        ...drawer.menuItem,
        ...menuItemRootStyles,
        overflow: 'hidden',
        left: 0,
        transition: transitions.cubicAll,
        transform,
        width: showing ? drawer.expandedWidth : drawer.narrowWidth,
        ...(active ? drawer.active : {}),
      },
      subMenu: {
        paddingLeft: showing ? 24 : 0,
        zIndex: 1395,
      },
      inner: {
      },
    },
    rowItem: {},
    expandedBtn: {
      position: 'relative',
      left: domain.expanded ? drawer.width - 64 : -16,
      transform: `rotate(${domain.expanded ? -180 : 0}deg)`,
    },
    expandedIcon: {
      ...drawer.menuItem,
    },
  })
}

export const injectStylesSheet = Component =>
  observer(withStyles(mapThemeToStyles)(Component))

