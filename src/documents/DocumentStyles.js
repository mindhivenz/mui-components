import { grey200, grey400 } from 'material-ui/styles/colors'

export default ({
  palette,
  colorManipulator,
}) => ({
  docStatefulIcon: {
    disabledColor: grey200,
  },
  docDropDownMenu: {
    iconColor: grey400,
  },
  docList: {
    iconColor: grey400,
    iconHoveredColor: palette.primary1Color,
    iconHoveredOpacity: 0.5,
    primaryTextDisabledColor: palette.disabledColor,
    primaryTextHoveredColor: colorManipulator.darken(palette.darkPrimary1Color, 0.45),
    secondaryTextDisabledColor: palette.disabledColor,
  },
})

