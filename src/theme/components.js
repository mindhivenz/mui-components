import { grey400, grey200 } from 'material-ui/styles/colors'

import dashboardTile from '../dashboard/DashboardStyles'
import drawer from '../AppDrawer/components/DrawerStyles'

import pageLayout from '../PageLayout/PageLayoutStyles'
import docList from '../documents/DocumentStyles'
import search from '../documents/SearchStyles'

export default (theme) => {
  const { spacing, palette, typography, colorManipulator, raisedButton } = theme

  const dialogTitle = {
    paddingTop: spacing.desktopGutterLess,
    paddingLeft: spacing.desktopGutter,
    padding: `${spacing.desktopGutterLess}px ${spacing.desktopGutter}px`,
    fontSize: theme.dialog.titleFontSize,
  }

  return ({
    ...dashboardTile(theme),
    ...docList(theme),
    ...drawer(theme),
    ...pageLayout(theme),
    ...search(theme),

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


    headerBar: {
      color: palette.alternateTextColor,
      backgroundColor: palette.primary1Color,
      disabledColor: palette.disabledColor,
      disabledBackgroundColor: palette.borderColor,
    },


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


  })
}
