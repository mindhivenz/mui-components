import measureIt from '../measureIt'
import withTheme from '../theme/withTheme'

const scaledComponent = (Component) => {

  const calcStyles = (_, {
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

  return measureIt({ fill: false })(
    withTheme(Component, calcStyles)
  )

}

export default scaledComponent
