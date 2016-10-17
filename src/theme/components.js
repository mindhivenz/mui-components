export default (theme) => {
  const { spacing, palette, typography, colorManipulator, raisedButton } = theme
  return ({
    app: {
      container: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        margin: '0 auto',
        color: palette.bodyTextColor,
        backgroundColor: palette.bodyColor,
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',

      },
      bar: {
        backgroundColor: palette.primary1Color,
        position: 'fixed',
        top: 0,
      },
      content: {
        position: 'fixed',
        boxSizing: 'border-box',

        width: '100%',
        height: '100%',
        overflowY: 'auto',

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
