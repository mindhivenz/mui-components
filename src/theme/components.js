export default (theme) => {
  const { spacing, palette, typography, colorManipulator, raisedButton } = theme

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

    docList: {
      icon: {
        color: palette.disabledColor,
        hovered: {
          color: palette.primary1Color,
          opacity: 0.5,
        },
      },
      primaryText: {
        disabled: {
          color: palette.disabledColor,
        },
        hovered: {
          color: colorManipulator.darken(palette.darkPrimary1Color, 0.45),
        },
      },
      secondaryText: {
        disabled: {
          color: palette.disabledColor,
        },
      },
    },

    drawer: {
      backgroundColor: palette.darkSecondary1Color,
      menuItem: {
        color: palette.secondary1Color,
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

    pageLayout: {
      headerBackgroundColor: palette.darkPrimary1Color,
      titleColor: palette.alternateTextColor,
      descriptionColor: colorManipulator.fade(palette.alternateTextColor, 0.6),
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

    search: {
      position: 'relative',
      color: palette.disabledColor,
    },

  })
}
