import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react'
import { app } from '@mindhive/di'

import withStyles from '../../theme/withStyles'

class Container extends Component {

  render() {
    const {
      styles,
      prepareStyles,
      windowSize={
        width: '100%',
        height: '100%'
      },
      centerCoordinates,
      zoom=13,
      google,
      loaded,
      interactive = true,
      children,
    } = this.props

    const [lat, lng] = centerCoordinates || [null, null]

    if (!loaded) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Map google={google}
             style={{width: '100%', height: '100%', position: 'relative'}}
             className={'map'}
             zoom={zoom}
             containerStyle={windowSize}
             initialCenter={{lat, lng}}
             center={{lat, lng}}
             centerAroundCurrentLocation={false}
             disableDefaultUI={!interactive}
             //onClick={this.onMapClicked}
             //onDragend={this.onMapMoved}
        >
          { children }
        </Map>
        {!interactive && <div style={prepareStyles(styles.overlay)}/>}
      </div>
    )
  }
}


const mapThemeToStyles = ({
  dashboardTile,
}, {
  windowSize={
    width: '100%',
    height: '100%'
  },
}) => ({
  overlay: {
    background: 'transparent',
    position: 'relative',
    ...windowSize,
  }
})

export default withStyles(mapThemeToStyles)(({
  inject: { Meteor } = app(),
  ...other,
}) => {
  console.log(other)
  const Wrapped = GoogleApiWrapper({
    apiKey: Meteor.settings.public.googleMapsApiKey,
    libraries: ['places','visualization'],
    version: 3
  })(Container)

  return (
    <Wrapped {...other} />
  )
})