import getMuiTheme from 'material-ui/styles/getMuiTheme'
import muiTypography from 'material-ui/styles/typography'
import * as colorManipulator from 'material-ui/utils/colorManipulator'
import transitions from 'material-ui/styles/transitions'
import animations from '../styles/animations'
import getComponents from './components'

const typography = muiTypography
typography.fontWeight100 = 100
typography.fontWeight300 = 300
typography.fontWeight400 = 400
typography.fontWeight500 = 500
typography.fontWeight700 = 700
typography.fontWeight900 = 900

const dimensions = {
  contentMaxWidthWide: 980,
  contentMaxWidthNarrow: 640,
}


export const createTheme = (isMobile, baseTheme, calcComponentsStyles) => {

  // console.log(baseTheme.description.label)

  const baseZIndex = {
    transition: 500,
  }

  const muiTheme = getMuiTheme({
    animations,
    colorManipulator,
    typography,
    dimensions,
    // palette: blueGreyThemeLightBody.palette,
    // palette: blueGreyThemeDarkBody.palette,
    palette: baseTheme.palette,
    zIndex: baseZIndex,
    transitions,
  })

  const componentsTheme = getComponents(muiTheme)
  const componentsStyles = calcComponentsStyles ? calcComponentsStyles(muiTheme) : {}

  return getMuiTheme(
    muiTheme,
    componentsTheme,
    componentsStyles,
    baseTheme.elements,
    isMobile ? baseTheme.mobileOverrides : {},
  )
}
