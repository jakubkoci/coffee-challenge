import { VictoryBar, VictoryPie } from 'victory'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import * as service from '../service'
import mapStyle from '../mapStyle.json'

const Index = ({ chartData }) => {
  return (
    <div>
      <h1>Coffe challenge</h1>

      <div className="charts">
        <div className="chart">
          <VictoryBar data={chartData} x="type" y="count" />
        </div>
        <div className="chart">
          <VictoryPie data={chartData} x="type" y="count" />
        </div>
      </div>

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

        .charts {
          display: flexbox;
        }

        .chart {
          flex: 1;
        }
      `}</style>
    </div>
  )
}

Index.getInitialProps = async (context) => {
  console.log(context)
  const chartData = await service.getChartData()
  return { chartData }
}

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