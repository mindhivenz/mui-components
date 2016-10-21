import getMuiTheme from 'material-ui/styles/getMuiTheme'
import typography from 'material-ui/styles/typography'
import * as colorManipulator from 'material-ui/utils/colorManipulator'
import transitions from 'material-ui/styles/transitions'
import getComponents from './components'


export const createTheme = (isMobile, baseTheme, calcComponentsStyles) => {

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

export default createTheme
