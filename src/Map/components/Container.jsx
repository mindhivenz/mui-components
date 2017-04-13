import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react'
import { app } from '@mindhive/di'

import { geoPointToMapPoint } from '../lib/GeoJSON'

import withStyles from '../../theme/withStyles'

const Container = ({
  zoom=13,
  interactive = true,
  centerPoint,

  google,
  loaded,

  styles,
  prepareStyles,
  children,
}) => {
  const initialCenter = centerPoint ? geoPointToMapPoint(centerPoint) : {lat: -36.844389199999995, lng: 174.7676005}
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
           initialCenter={initialCenter}
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