import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { compose, withStateHandlers } from 'recompose'
import mapStyle from '../mapStyle.json'

const GOOGLE_MAP_API_KEY = 'AIzaSyAygeTGTlo0iMJLFXnEGYK9T9mYxwrTqH0'
const GOOGLE_MAP_API_URL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'

const googleMapUrl = `${GOOGLE_MAP_API_URL}&key=${GOOGLE_MAP_API_KEY}`

const MapContainer = ({ locationsData }) => {
  return (
    <div className="map">
      <Map
        locations={locationsData}
        googleMapURL={googleMapUrl}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '600px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />

      <style jsx>{`
        .map {
          padding: 2em 0 3em 0;
        }
      `}</style>
    </div>
  )
}

const Map = compose(
  withStateHandlers(() => ({
    openLocationId: null,
  }), {
    onToggleOpen: ({ openLocationId }) => (locationId) => {
      return {
        openLocationId: openLocationId === locationId ? null : locationId
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)(({ locations, openLocationId, onToggleOpen }) =>
  <GoogleMap
    defaultZoom={6}
    defaultCenter={{ lat: 50.1722983, lng: 14.4980394 }}
    defaultOptions={{ styles: mapStyle }}
  >
    {locations.map((location, index) => {
      return (
        <Marker 
          key={location.id + index} 
          position={{ lat: location.lat, lng: location.lng }} 
          onClick={() => onToggleOpen(location.id)}
        >
          {openLocationId === location.id && (
            <InfoWindow onCloseClick={() => onToggleOpen(null)}>
              <span>{location.name}</span>
            </InfoWindow>
          )}
        </Marker>
      )
    })}
  </GoogleMap>
)

export default MapContainer