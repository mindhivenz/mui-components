import React from 'react'
import {BaseMarker} from './components/BaseMarker'

class Marker extends BaseMarker {

  createMarker(map, google, position) {
    const {
      icon,
      label,
      draggable
    } = this.props
    const pref = {
      map: map,
      position: position,
      icon: icon,
      label: label,
      draggable: draggable
    }
    return new google.maps.Marker(pref)  }
}

export default Marker