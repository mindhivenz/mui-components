import * as colorManipulator from 'material-ui/utils/colorManipulator'

import {
  blueGrey50,
  green500,
  blue500,
  red500,
  orange500,
  orange600,
  orange700,
  amber500,
  amber700,
  deepOrange500,
  white,
} from 'material-ui/styles/colors'

import {
  lightPaleBlue, darkPaleBlue,
  lightBlueGrey50,
  lightBlueGrey100,
  lightBlueGrey200,
  lightBlueGrey300,
  lightBlueGrey400,
  lightBlueGrey500,
  lightBlueGrey600,
  lightBlueGrey700,
  lightBlueGrey800,
  lightBlueGrey900,
  darkBlueGrey,
} from '../colors'

const palette = {
  darkPrimary1Color: lightBlueGrey700,
  primary1Color: lightBlueGrey500,
  primary2Color: lightBlueGrey900,
  primary3Color: lightBlueGrey300,
  darkSecondary1Color: '#16232d',
  secondary1Color: lightBlueGrey100,
  accent1Color: orange600,
  accent2Color: blueGrey50,
  errorText: red500,
  textColor: darkBlueGrey,
  alternateTextColor: white,
  bodyColor: lightBlueGrey400,
  bodyTextColor: colorManipulator.fade(white, 0.8),

  positiveColor: green500,
  warningColor: amber700,
  negativeColor: red500,
  neutralColor: blue500,

  // primary2Color: cyan700,
  // primary3Color: grey400,
  // accent2Color: grey100,
  // accent3Color: grey500,
  // secondaryTextColor: fade(darkBlack, 0.54),
  // canvasColor: white,
  // borderColor: grey300,
  // disabledColor: fade(darkBlack, 0.3),
  // pickerHeaderColor: cyan500,
  // clockCircleColor: fade(darkBlack, 0.07),
  // shadowColor: fullBlack,
}

const elements = {
  textField: {
    focusColor: palette.accent1Color,
  },
  toggle: {
    thumbOnColor: palette.accent1Color,
    thumbOffColor: palette.primary1Color,
    trackOnColor: colorManipulator.fade(palette.accent1Color, 0.5),
    trackOffColor: colorManipulator.fade(palette.primary1Color, 0.5),
  },
  tasks: {
    name: {
      color: colorManipulator.fade(palette.bodyColor, 0.65),
    },
  },


}

const mobileOverrides = {
  listItem: {
    leftIconColor: palette.bodyTextColor,
    primaryTextColor: palette.bodyTextColor,
    secondaryTextColor: colorManipulator.fade(palette.bodyTextColor, 0.35),
    // rightIconColor: grey600,
  },
  textField: {
    // textColor: palette.bodyTextColor,
    // hintColor: colorManipulator.fade(palette.bodyTextColor, 0.35),
    // floatingLabelColor: palette.bodyTextColor,
    focusColor: palette.accent1Color,
    borderColor: palette.bodyTextColor,
  },
}

export default {
  id: 'blueGreyThemeDarkBody',
  description: {
    label: 'Blue grey dark body',
  },
  palette,
  elements,
  mobileOverrides,
}
