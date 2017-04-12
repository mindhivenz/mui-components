import React from 'react'
import BaseMarker from './components/BaseMarker'

class Circle extends BaseMarker {

  createMarker(map, google, position) {
    const {
      fillColor = '#FF0000',
      fillOpacity = 0.35,
      strokeColor = fillColor,
      radius = 20,
    } = this.props
    return new google.maps.Circle({
      strokeColor: strokeColor,
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: fillColor,
      fillOpacity: fillOpacity,
      map: map,
      center: position,
      radius: radius
    })
  }

}

export default Circle