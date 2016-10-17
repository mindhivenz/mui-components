export default (theme) => {
  const { spacing, palette, typography, colorManipulator, raisedButton } = theme
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

  })
}
