import getMuiTheme from 'material-ui/styles/getMuiTheme'
import muiTypography from 'material-ui/styles/typography'
import * as colorManipulator from 'material-ui/utils/colorManipulator'
import transitions from 'material-ui/styles/transitions'
import animations from '../styles/animations'
import getComponents from './components'


const typography = (isMobile) => ({
  ...muiTypography,

  fontWeightRegular: muiTypography.fontWeightNormal,

  headline: {
    fontSize: 24,
    fontWeight: muiTypography.fontWeightNormal,
    whiteSpace: 'nowrap',
  },
  title: {
    fontSize: 20,
    fontWeight: muiTypography.fontWeightMedium,
    whiteSpace: 'nowrap',
  },
  subheading: {
    fontSize: isMobile ? 16 : 15,
    fontWeight: muiTypography.fontWeightNormal,
    lineHeight: `24px`,
  },
  body2: {
    fontSize: isMobile ? 14 : 13,
    fontWeight: muiTypography.fontWeightMedium,
    lineHeight: `24px`,
  },
  body: {
    fontSize: isMobile ? 14 : 13,
    fontWeight: muiTypography.fontWeightNormal,
    lineHeight: `20px`,
  },
})

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
    typography: typography(isMobile),
    dimensions,
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
