import { Enum } from 'enumify'


export class WindowSize extends Enum {}

// https://www.google.com/design/spec/layout/responsive-ui.html#responsive-ui-breakpoints
// Keep in size order
WindowSize.initEnum({
  X_SMALL: {
    breakpoint: 600,
  },
  SMALL: {
    breakpoint: 960,
  },
  MEDIUM: {
    breakpoint: 1280,
  },
  LARGE: {
    breakpoint: 1920,
  },
  X_LARGE: {},
})

