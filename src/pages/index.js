import React from 'react'
import { VictoryBar, VictoryPie, VictoryTooltip } from 'victory'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { compose, withStateHandlers } from 'recompose'
import reshader from 'reshader'
import * as service from '../service'
import mapStyle from '../mapStyle.json'

const BASE_COLOR = '#D9B068'

const GOOGLE_MAP_API_KEY = 'AIzaSyAygeTGTlo0iMJLFXnEGYK9T9mYxwrTqH0'
const GOOGLE_MAP_API_URL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'

const googleMapUrl = `${GOOGLE_MAP_API_URL}&key=${GOOGLE_MAP_API_KEY}`

const getColors = (baseColor) => {
  return reshader(baseColor).palette.reverse()
}

const withColors = (colors) => (chartData) => {
  return chartData.map((chartDataItem, index)=> ({ ...chartDataItem, color: colors[index] }))
}

const withLabels = (chartData) => {
  return chartData.map((chartDataItem)=> ({ ...chartDataItem, label: chartDataItem.type }))
}

const Index = ({ chartData }) => {
  const colors = getColors(BASE_COLOR)

  return (
    <div className="content">
      <h1>Coffee challenge</h1>

      <div className="charts">
        <div className="chart">
          <VictoryBar 
            style={{ data: { fill: d => d.color } }}
            data={withLabels(withColors(colors)(chartData))} 
            x="type"
            y="count"
            labelComponent={
              <VictoryTooltip 
                flyoutStyle={{ fill: '#faf5e7', stroke: '#2B1C02', margin: 0 }} 
                cornerRadius={1}
                pointerLength={3}
                pointerWidth={4}
              />
            }
          />
        </div>
        <div className="chart">
          <VictoryPie 
            style={{ data: { fill: d => d.color } }} 
            labels={[]}
            labelComponent={
              <VictoryTooltip 
                flyoutStyle={{ fill: '#faf5e7', stroke: '#2B1C02', margin: -10 }} 
                cornerRadius={1}
                pointerLength={3}
                pointerWidth={4}
              />
            }
            data={withLabels(withColors(colors)(chartData))} 
            x="type"
            y="count"
          />
        </div>
        <div className="legend">
          <table>
            {withColors(colors)(chartData).map(item => {
              const size = 10
              return (
                <tr key={item.type}>
                  <td>
                    <svg width={size} height={size}>
                      <rect width={size} height={size} style={{ fill: item.color }} />
                    </svg>
                  </td>
                  <td>{item.type}</td>
                  <td>{item.count}</td>
                </tr>
              )
            })}
          </table>
        </div>
      </div>

      <div className="map">
        <MapComponent
          locations={service.getLocationsData()}
          googleMapURL={googleMapUrl}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '600px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>

      <style jsx>{`
        .content { 
          font-family: 'Lato', sans-serif;
          max-width: 68.750em;
          margin: 0 auto;
        }

        h1 { 
          font-family: 'Lobster', cursive;
          font-size: 2.5rem;
          letter-spacing: 0.03em;
          color: #2B1C02;
          padding: 0.5em 0.5em;
          margin: 0;
        }

        .charts {
          display: flex;
          flex-direction: column;
          padding: 2em 0;
        }

        .chart {
          flex: 1;
        }

        .chart-pie {
          padding: 2em;
        }

        .legend {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .map {
          padding: 2em 0 3em 0;
        }

        @media screen and (min-width: 600px) {
          h1 {
            font-size: 3.5rem;
            padding: 0.5em 1.5em;
          }

          .charts {
            padding: 2em 6em;
          }
        }

        @media screen and (min-width: 900px) {
          .charts {
            flex-direction: row;
          }
        }

        @media screen and (min-width: 1200px) {
          h1 {
            font-size: 4.5rem;
            padding: 0.5em 0.5em;
          }

          .charts {
            padding: 2em 0;
          }
        }
      `}</style>
    </div>
  )
}

Index.getInitialProps = async () => {
  const chartData = await service.getChartData()
  return { chartData }
}

const MapComponent = compose(
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
        <Marker key={location.id + index} position={{ lat: location.lat, lng: location.lng }} onClick={() => onToggleOpen(location.id)}>
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

export default Index
