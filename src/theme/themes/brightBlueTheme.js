import {
  blue700,
  blue500,
  green500,
  red500,
  darkBlack,
  blueGrey50,
  deepOrange500,
  white,
} from 'material-ui/styles/colors'

import {
  lightSteelGrey, darkSteelGrey,
} from '../colors'

const palette = {
  darkPrimary1Color: blue700,
  primary1Color: blue500,
  darkSecondary1Color: darkSteelGrey,
  secondary1Color: lightSteelGrey,

  accent1Color: green500,
  accent2Color: white,
  errorText: red500,
  textColor: darkBlack,
  alternateTextColor: white,
  bodyColor: blueGrey50,
  bodyTextColor: darkBlack,

  positiveColor: green500,
  warningColor: deepOrange500,
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
}

const mobileOverrides = {
}

export default {
  id: 'brightBlueTheme',

  description: {
    label: 'Bright blue',
  },
  palette,
  elements,
  mobileOverrides,
}
