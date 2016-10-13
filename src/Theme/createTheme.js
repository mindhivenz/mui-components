import getMuiTheme from 'material-ui/styles/getMuiTheme'
import typography from 'material-ui/styles/typography'
import * as colorManipulator from 'material-ui/utils/colorManipulator'
import transitions from 'material-ui/styles/transitions'

export const createTheme = (isMobile, isWeb, baseTheme) => {

  // console.log(baseTheme.description.label)

  const baseZIndex = {
    transition: 500,
  }

  const muiTheme = getMuiTheme({
    colorManipulator,
    typography,
    // palette: blueGreyThemeLightBody.palette,
    // palette: blueGreyThemeDarkBody.palette,
    palette: baseTheme.palette,
    zIndex: baseZIndex,
    transitions,
  })

  const { spacing, palette } = muiTheme

  const root = {
    dialogTitle: {
      paddingTop: spacing.desktopGutterLess,
      paddingLeft: spacing.desktopGutter,
      padding: `${spacing.desktopGutterLess}px ${spacing.desktopGutter}px`,
      fontSize: muiTheme.dialog.titleFontSize,
    },
    pageLayout: {
      header: {
        backgroundColor: palette.darkPrimary1Color,
      },
    },
    fixedContainer: {
      position: 'fixed',
      boxSizing: 'border-box',
    },
    digit: {
      topPadding: spacing.desktopGutterMini / 3,
      sidePadding: spacing.desktopGutterMini,
      topMargin: spacing.desktopGutterMini / 2,
      sideMargin: spacing.desktopGutterMini / 2,
    },
    pinCodeIcon: {
      // position: 'relative',
      // top: 12,
      fontSize: spacing.iconSize * 1.5,
      color: 'white',
      willChange: 'opacity',
      transition: 'transition: opacity .25s ease-in-out',
      opacity: 0.25,
    },
    search: {
      position: 'relative',
      color: palette.disabledColor,
    },

  }


  return (getMuiTheme(muiTheme, {
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
    dialog: {
      title: {
        ...root.dialogTitle,
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
        ...root.dialogTitle,
        color: palette.disabledColor,
        backgroundColor: palette.borderColor,
      },
      closeColor: palette.borderColor,
      closeHoverColor: palette.negativeColor,
    },
    drawer: {
      color: palette.darkSecondary1Color,

      menuItem: {
        // color: 'red',
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
    radioButton: {
      root: {
        marginBottom: 16,
      },
      label: {

      },
      hint: {
        fontSize: 12,
        lineHeight: '12px',
        color: palette.disabledColor,
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
          color: colorManipulator.darken(root.pageLayout.header.backgroundColor, 0.45),
        },
      },
      secondaryText: {
        disabled: {
          color: palette.disabledColor,
        },
      },
    },
    issues: {
      newColor: palette.negativeColor,
      inProgressColor: palette.neutralColor,
      resolvedColor: palette.positiveColor,
      secondary: (color) => colorManipulator.lighten(color, 0.45),
      history: {
        color: palette.disabledColor,
        strongColor: palette.textColor,
      },
    },
    worksheets: {
      emptyColor: palette.disabledColor,
      inProgressColor: palette.neutralColor,
      completeColor: palette.positiveColor,
      abandonedColor: palette.warningColor,
      hasFailsColor: colorManipulator.lighten(palette.negativeColor, 0.2),
      secondary: (color) => colorManipulator.lighten(color, 0.45),
      history: {
        color: palette.disabledColor,
        strongColor: palette.textColor,
      },
    },
    measureComponent: {
      position: 'relative',
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
    },
    pageLayout: {
      headerBackgroundColor: root.pageLayout.header.backgroundColor,
      titleColor: palette.alternateTextColor,
      descriptionColor: colorManipulator.fade(palette.alternateTextColor, 0.6),
    },
    pinCode: {
      root: {
        marginTop: spacing.desktopGutterMore * 1.5,
      },
      keyPad: {
        textAlign: 'center',
        marginTop: spacing.desktopGutterLess,

      },
      key: {
        color: palette.alternateTextColor,
        height: 58,
        minWidth: 58,
        // margin: spacing.desktopGutterMini,
        // padding: spacing.desktopGutterMini,
        // border: `1px solid ${colorManipulator.emphasize(palette.darkPrimary1Color, 0.15)}`,
        // borderRadius: '50%',
        backgroundColor: 'transparent',

        label: {
          fontSize: 30,
          fontWeight: 700,
        },
      },
      key0: {
        position: 'relative',
        top: -14,
      },
      icon: {
        ...root.pinCodeIcon,
      },
      iconEnabled: {
        opacity: 0.9,
      },
      backSpaceIcon: {
        ...root.pinCodeIcon,
        fontSize: root.pinCodeIcon.fontSize * 0.75,
        // top: root.pinCodeIcon.top - 2,

      },
      error: {
        color: palette.errorText,
      },
    },
    pinDisplay: {
      root: {
        textAlign: 'center',
      },
      chunk: {
        display: 'inline-block',
        padding: `0 ${spacing.desktopGutterMini}px`,
        margin: `0 ${spacing.desktopGutterMini / 2}px`,
        // zDepth: 1,
        // ...paper,
        // boxShadow: paper.zDepthShadows[1],
        // borderRadius: '3px',
      },
      digit: {
        empty: {
          fontFamily: '"Lucida Console", Monaco, monospace',
          display: 'inline-block',
          textDecoration: 'underline',
          margin: `${root.digit.topMargin}px ${root.digit.sideMargin}px`,
          // padding: `${root.digit.topPadding}px ${root.digit.sidePadding}px`,
          // color: colorManipulator.fade(palette.disabledColor, 0.05),
          color: colorManipulator.emphasize(palette.darkPrimary1Color, 0.15),
          fontSize: 24,
          fontWeight: 700,

        },
        full: {
          textDecoration: 'none',
          color: colorManipulator.emphasize(palette.primary1Color, 0.75),
        },
      },
      placeHolder: {
        empty: {
          display: 'inline-block',
          width: 8,
          height: 8,
          margin: spacing.desktopGutterLess,
          color: palette.disabledColor,
          border: `1px solid ${palette.alternateTextColor}`,
          borderRadius: '50%',
        },
        full: {
          backgroundColor: palette.alternateTextColor,
        },
      },
    },
    raisedButton: {
      primaryColor: muiTheme.raisedButton.secondaryColor,
      primaryTextColor: muiTheme.raisedButton.secondaryTextColor,
      secondaryColor: muiTheme.raisedButton.primaryColor,
      secondaryTextColor: muiTheme.raisedButton.primaryTextColor,
    },
    search: {
      ...root.search,
      icon: {
        ...root.search,
        top: spacing.desktopGutterMini,
        margin: `0 ${spacing.desktopGutterMini / 2}px 0 ${spacing.desktopGutterLess}px`,
      },
      textField: {
        ...root.search,
        left: `${spacing.desktopGutterMore}px`,
      },
      top: spacing.desktopGutterLess,
      marginBottom: `${spacing.desktopGutterLess}px`,
    },
    tasks: {
      name: {
        color: colorManipulator.fade(palette.textColor, 0.65),
      },
      isModified: {
        fontWeight: 'bold',
      },
    },
    version: {
      color: colorManipulator.emphasize(palette.darkSecondary1Color, 0.25),
      textAlign: 'center',
    },
    fillParent: {
      position: 'relative',
      // boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
    },
    needToInspect: {
      neededColor: colorManipulator.fade(palette.borderColor, 0.1),
      inProgressColor: colorManipulator.fade(palette.neutralColor, 0.5),
      allPassedColor: colorManipulator.fade(palette.positiveColor, 0.5),
      hasFaultColor: colorManipulator.fade(palette.negativeColor, 0.5),
    },
    mobile: {
      bodyContent: {
        primaryText: {
          color: palette.bodyTextColor,
        },
        secondaryText: {
          color: palette.bodyTextColor,
          opacity: 0.5,
        },
      },
      fixedContainer: root.fixedContainer,
      fillEntireScreen: {
        ...root.fixedContainer,
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
      },
      fillParent: {
        position: 'relative',
        // boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
      },
      containContent: {
        // overflow: 'hidden',
        height: 'auto',
        boxSizing: 'border-box',
      },
      fakeInspectionPlugin: {
        passColor: palette.positiveColor,
        failColor: palette.negativeColor,
        container: {
          backgroundColor: 'black',
          color: palette.alternateTextColor,
          zIndex: 10000,
        },
        task: {
          position: 'relative',
          boxSizing: 'border-box',
          margin: '0 auto',
          textAlign: 'center',
          fontSize: 18,
        },
        plugin: {
          position: 'relative',
          boxSizing: 'border-box',
          margin: `${spacing.desktopKeylineIncrement}px auto`,
          width: 300,
          height: 400,
          // border: '1px solid white',
        },
      },
      page: {
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
      },
      authPage: {
        p: {
          maxWidth: '65%',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
        position: 'fixed',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundColor: palette.darkPrimary1Color,
        textAlign: 'center',
        color: 'white',
      },

      transitionPage: {
        backgroundColor: palette.bodyColor,
      },

      resetDevice: {
        marginTop: spacing.desktopGutter,
        color: colorManipulator.emphasize(palette.primary1Color, 0.25),
        fontSize: 18,
      },
      navAppBar: {
        backgroundColor: palette.darkPrimary1Color,
      },
      scrollingList: {
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        overflowY: 'auto',
      },
      task: {
        notInspected: {
          color: palette.disabledColor,
        },
        pass: {
          color: palette.positiveColor,
        },
        fail: {
          color: palette.negativeColor,
        },
      },
    },
  },
    baseTheme.elements,
    isMobile ? baseTheme.mobileOverrides : {},
  ))
}

export default createTheme