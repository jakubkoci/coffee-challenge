import { VictoryBar, VictoryPie } from 'victory'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import mapStyle from '../mapStyle.json'

const barData = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

const pieData = [
  { x: "Cats", y: 35 },
  { x: "Dogs", y: 40 },
  { x: "Birds", y: 55 }
]

const Index = () => (
  <div>
    <h1>Coffe challenge</h1>

    <VictoryBar data={barData} x="quarter" y="earnings" />

    <VictoryPie data={pieData} />

    <MapComponent
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `600px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />

    <style jsx>{`
      h1 { 
        font-family: 'Lobster', cursive;
        font-size: 5em;
        letter-spacing: 0.03em;
      }
    `}</style>
  </div>
)

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lat: 50.1722983, lng: 14.4980394 }}
    defaultOptions={{ styles: mapStyle }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))

export default Index