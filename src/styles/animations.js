import transitions from 'material-ui/styles/transitions'

export const TRANSITION_IN_MS = 450
export const TRANSITION_OUT_MS = 350

export const CUBIC_BEZIER = 'cubic-bezier(0.23, 1, 0.32, 1)'

export const trans = {
  cubicAll: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  cubicAllFor: ms => `all ${ms}ms cubic-bezier(0.23, 1, 0.32, 1) 0ms`,
  cubicBezier: ({property = 'all', duration = 450, delay=0} = {}) => `${property} ${duration}ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
}

export default {

  cubicAll: {
    property: 'all',
    easeFunction: CUBIC_BEZIER,
    duration: TRANSITION_IN_MS,
  },

  fadeIn: {
    property: 'opacity',
    value: 1,
    easeFunction: 'ease-out',
    duration: TRANSITION_IN_MS,
  },

  fadeOut: {
    property: 'opacity',
    value: 0.01,
    easeFunction: 'ease-in',
    duration: TRANSITION_OUT_MS,
  },

  slideFromLeft: {
    property: 'left',
    value: 0,
    easeFunction: 'ease-out',
    duration: TRANSITION_IN_MS,
  },

  slideToLeft: {
    property: 'left',
    value: '-100%',
    easeFunction: 'ease-in',
    duration: TRANSITION_OUT_MS,
  },

  slideFromRight: {
    property: 'right',
    value: 0,
    easeFunction: 'ease-out',
    duration: TRANSITION_IN_MS,
  },

  slideToRight: {
    property: 'right',
    value: '-100%',
    easeFunction: 'ease-in',
    duration: TRANSITION_OUT_MS,
  },

  slideFromTop: {
    property: 'top',
    value: 0,
    easeFunction: 'ease-out',
    duration: TRANSITION_IN_MS,
  },

  slideToTop: {
    property: 'top',
    value: '-100%',
    easeFunction: 'ease-in',
    duration: TRANSITION_OUT_MS,
  },

  slideFromBottom: {
    property: 'bottom',
    value: 0,
    easeFunction: 'ease-out',
    duration: TRANSITION_IN_MS,
  },

  slideToBottom: {
    property: 'bottom',
    value: '-100%',
    easeFunction: 'ease-in',
    duration: TRANSITION_OUT_MS,
  },

  build(animations, duration = null) {
    const animation = {
      transition: '',
    }
    animations.forEach((a) => {
      animation[a.property] = a.value || 'auto'
      if (animation.transition) animation.transition += ','
      animation.transition += transitions.create(`${duration || a.duration}ms`, a.property, null, a.easeFunction)
    })
    return animation
  },
}
