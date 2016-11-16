import { grey400, grey200 } from 'material-ui/styles/colors'

import dashboardTile from '../dashboard/DashboardStyles'

import pageLayout from '../PageLayout/PageLayoutStyles'
import docList from '../documents/DocumentStyles'

export default (theme) => {
  const { spacing, palette, typography, colorManipulator, raisedButton, drawer } = theme

  const dialogTitle = {
    paddingTop: spacing.desktopGutterLess,
    paddingLeft: spacing.desktopGutter,
    padding: `${spacing.desktopGutterLess}px ${spacing.desktopGutter}px`,
    fontSize: theme.dialog.titleFontSize,
  }

  return ({
    app: {
      container: {
        color: palette.bodyTextColor,
        backgroundColor: palette.bodyColor,
      },
      bar: {
        backgroundColor: palette.primary1Color,
        position: 'fixed',
        top: 0,
      },
    },

    connectionStatus: {
      backgroundColor: palette.darkSecondary1Color,
      textColor: palette.errorText,
      clickColor: palette.alternateTextColor,
    },

    docStatefulIcon: {
      disabledColor: grey200,
    },
    docDropDownMenu: {
      iconColor: grey400,
    },

    ...dashboardTile(theme),
    ...docList(theme),

    drawer: {
      expandedWidth: drawer.width,
      narrowWidth: spacing.desktopDrawerMenuItemHeight,
      backgroundColor: palette.darkSecondary1Color,
      menuItem: {
        color: palette.secondary1Color,
        fontWeight: typography.fontWeight100,
        fontSize: 18,
      },
      active: {
        fontWeight: typography.fontWeightMedium,
        color: palette.accent2Color,
      },
      divider: {
        backgroundColor: colorManipulator.darken(palette.secondary1Color, 0.45),
      },
      docked: {
        top: spacing.desktopKeylineIncrement,
      },
    },

    headerBar: {
      color: palette.alternateTextColor,
      backgroundColor: palette.primary1Color,
      disabledColor: palette.disabledColor,
      disabledBackgroundColor: palette.borderColor,
    },

    ...pageLayout(theme),

    raisedButton: {
      primaryColor: raisedButton.secondaryColor,
      primaryTextColor: raisedButton.secondaryTextColor,
      secondaryColor: raisedButton.primaryColor,
      secondaryTextColor: raisedButton.primaryTextColor,
    },

    version: {
      color: colorManipulator.emphasize(palette.darkSecondary1Color, 0.25),
      textAlign: 'center',
    },

    dialog: {
      title: {
        ...dialogTitle,
        color: palette.alternateTextColor,
        backgroundColor: palette.primary1Color,
      },
      root: {
        body: {
          padding: `${spacing.desktopGutterLess}px ${spacing.desktopGutter}px ${spacing.desktopGutter}px`,
          marginTop: `${spacing.desktopGutterLess}px`,
        },
        buttons: {
          marginTop: spacing.desktopGutter,
          textAlign: 'right',
          position: 'relative',
        },
        content: {
          width: '350px',
          maxWidth: 'none',
        },
        description: {
          fontWeight: 'bold',
        },
      },
      titleDisabled: {
        ...dialogTitle,
        color: palette.disabledColor,
        backgroundColor: palette.borderColor,
      },
      closeColor: palette.borderColor,
      closeHoverColor: palette.negativeColor,
    },

    search: {
      position: 'relative',
      color: palette.disabledColor,
    },

  })
}
