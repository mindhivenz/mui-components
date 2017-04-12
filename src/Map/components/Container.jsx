import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react'

class Container extends Component {

  render() {
    const {
      google,
      loaded
    } = this.props

    const style = {
      width: '100vw',
      height: '100vh'
    }
    if (!loaded) {
      return <div>Loading...</div>
    }
    return (
      <div style={style}>
        <Map google={google}
             style={{width: '100%', height: '100%', position: 'relative'}}
             className={'map'}
             zoom={14}
             containerStyle={{}}
             centerAroundCurrentLocation={true}
             //onClick={this.onMapClicked}
             //onDragend={this.onMapMoved}
        />
      </div>
    )
  }
}

export default GoogleApiWrapper({
 apiKey: 'AIzaSyD6D8LySpdAgnvug3yiGUd94ZiGbi3SFqY',
 libraries: ['places','visualization'],
 version: 3
})(Container)