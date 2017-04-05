import { Enum } from 'enumify'


const DESKTOP_CHROME_ALLOWANCE = 16  // As per spec: https://material.io/guidelines/layout/responsive-ui.html#responsive-ui-breakpoints

export default class WindowSize extends Enum {}

// https://material.io/guidelines/layout/responsive-ui.html#responsive-ui-breakpoints
// Keep in size order
WindowSize.initEnum({
  X_SMALL: {
    breakpoint: 600,
  },
  SMALL: {
    breakpoint: 960,
  },
  MEDIUM: {
    breakpoint: 1280 - DESKTOP_CHROME_ALLOWANCE,
  },
  LARGE: {
    breakpoint: 1920 - DESKTOP_CHROME_ALLOWANCE,
  },
  X_LARGE: {},
})

