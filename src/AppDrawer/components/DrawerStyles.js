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
  appDrawer = {
    menuItem: {},
  },
},
  {
    active,
    hovered,
    menuItemHovered,
    hideWhenExpanded,
    hideWhenNarrow,
    overrideAppDrawerStyle = {},
    inject: { navDrawerDomain: domain, layoutDomain } = app(),
  }
) => {
  const appDrawerStyles = Object.assign({}, appDrawer, overrideAppDrawerStyle)
  const drawerBackgroundColor = appDrawerStyles.backgroundColor || drawer.backgroundColor
  const hoveredBackgroundColor = appDrawerStyles.hoveredBackgroundColor || colorManipulator.darken(drawerBackgroundColor, 0.1)
  const drawerMenuItem =  Object.assign({}, drawer.menuItem, appDrawerStyles.menuItem)
  const drawerActiveIcon =  Object.assign({}, drawer.activeIcon, appDrawerStyles.activeIcon || {})
  const drawerActiveMenuItem =  Object.assign({}, drawer.active, appDrawerStyles.active || {})

  const menuItemRootStyles = {
    backgroundColor: hovered ? hoveredBackgroundColor : appDrawerStyles.menuItem.backgroundColor || drawerBackgroundColor,
  }
  const showing = domain.expanded || hovered
  const translateDistance = domain.expanded ? drawer.expandedWidth : drawer.narrowWidth
  const transform = domain.docked || domain.open ? 'translate(0, 0)' : `translate(-${translateDistance}px, 0)`
  const topOffset = layoutDomain.topOffset
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
      backgroundColor: drawerBackgroundColor,
      height: `calc(100% - ${topOffset}px)`,
      marginTop: topOffset,
      // left: domain.open || domain.docked ? 0 : -drawer.expandedWidth,
      transition: transitions.cubicAll,
      transform,
    },
    divider: drawer.divider,
    menuItem: menuItemRootStyles,
    icon: {
      ...drawerMenuItem,
      ...(active ? drawerActiveIcon : {}),
      transform: `translate(3px, 3px) ${active ? drawerActiveIcon.transform : ''}`,
    },
    subIcon: isActive => ({
      ...drawerMenuItem,
      ...(isActive ? drawerActiveIcon : {}),
      transform: `translate(3px, 3px) ${isActive ? drawerActiveIcon.transform : ''}`,
    }),
    menuLabel: {
      container: {
        display: 'inline-block',
      },
    },
    menuItemFlyOut: {
      container: {
        position: domain.isFixedWidth ? 'relative' : 'fixed',
        zIndex: 1390,
        ...drawerMenuItem,
        ...menuItemRootStyles,
        overflow: 'hidden',
        left: 0,
        transition: `${transitions.cubicAll}, top 0s`,
        transform,
        width: showing ? drawer.expandedWidth : drawer.narrowWidth,
        ...(active ? drawerActiveMenuItem : {}),
      },
      subMenu: {
        paddingLeft: showing ? 24 : 0,
        zIndex: 1390,
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
      ...drawerMenuItem,
    },
  })
}

export const injectStylesSheet = Component =>
  observer(withStyles(mapThemeToStyles)(Component))

