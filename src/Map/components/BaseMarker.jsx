import React, { Component } from 'react'

import { camelize } from '../lib/Strings'
const evtNames = ['click', 'mouseover', 'recenter', 'dragend']

const wrappedPromise = function() {
  var wrappedPromise = {},
    promise = new Promise(function (resolve, reject) {
      wrappedPromise.resolve = resolve
      wrappedPromise.reject = reject
    })
  wrappedPromise.then = promise.then.bind(promise)
  wrappedPromise.catch = promise.catch.bind(promise)
  wrappedPromise.promise = promise

  return wrappedPromise
}

export class BaseMarker extends Component {

  componentDidMount() {
    this.markerPromise = wrappedPromise()
    this.renderMarker()
  }

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
      if (this.marker) {
        this.marker.setMap(null)
      }
      this.renderMarker()
    }
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null)
    }
  }

  renderMarker() {
    const {
      map,
      google,
      mapCenter,
      coordinates,
    } = this.props
    if (!google) {
      return null
    }

    let position = coordinates ? {lat: coordinates[0], lng: coordinates[1]} : mapCenter
    if (!(position instanceof google.maps.LatLng)) {
      position = new google.maps.LatLng(position.lat, position.lng)
    }

    this.marker = this.createMarker(map, google, position)

    evtNames.forEach(e => {
      this.marker.addListener(e, this.handleEvent(e))
    })

    this.markerPromise.resolve(this.marker)
  }

  createMarker(map, google, position) {
    // Abstract
  }

  getMarker() {
    return this.markerPromise
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e)
      }
    }
  }

  render() {
    return null
  }
}


export default BaseMarker