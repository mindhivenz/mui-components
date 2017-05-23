import compose from 'recompose/compose'

import dimensions from '../dimensions'
import withStyles from '../theme/withStyles'

const scaledComponent = (Component) => {

  const mapThemeToStyles = (_, {
    page: { width, height },
    containerWidth,
    containerHeight,
  }) => {
    let scale = height / containerHeight
    let newWidth = containerWidth * scale
    while (newWidth > width) {
      scale -= 0.01
      newWidth = containerWidth * scale
    }
    const trans = Math.trunc((height - containerHeight) / 2)

    return ({
      position: 'relative',
      transform: `translateY(${trans}px) scale(${scale},${scale})`,
      border: '1px solid transparent',
    })
  }

  return compose(
    dimensions,
    withStyles(mapThemeToStyles),
  )(Component)

}

export default scaledComponent
