import React from 'react'
import {Marker as GMRMarker} from 'google-maps-react'

const Marker = ({
  coordinates: [lat, lng] = [null, null],
  name,
  ...other,
}) =>
  <GMRMarker
    name={name}
    position={{lat, lng}}
    {...other}
  />

export default Marker