import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react'
import { app } from '@mindhive/di'

import withStyles from '../../theme/withStyles'

class Container extends Component {

  render() {
    const {
      zoom=13,
      interactive = true,

      styles,
      prepareStyles,
      centerCoordinates: [lat, lng] = [null, null],
      google,
      loaded,
      children,
    } = this.props

    const centerCoordinates = {lat, lng}
    if (!loaded) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Map google={google}
             style={styles.map}
             className={'map'}
             zoom={zoom}
             containerStyle={styles.container}
             initialCenter={centerCoordinates}
             center={centerCoordinates}
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
}, {
  containerWidth,
  containerHeight,
}) => ({
  container: {
    width: containerWidth ? `${containerWidth}px` : '100%',
    height: containerHeight ? `${containerHeight}px` : '100%',
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  overlay: {
    background: 'transparent',
    position: 'relative',
  },
})

export default withStyles(mapThemeToStyles)(({
  inject: { Meteor } = app(),
  ...other,
}) => {
  const WithMapsApi = GoogleApiWrapper({
    apiKey: Meteor.settings.public.googleMapsApiKey,
    libraries: ['places','visualization'],
    version: 3
  })(Container)

  return (
    <WithMapsApi {...other} />
  )
})