import React from 'react'
import { VictoryBar, VictoryPie, VictoryTooltip } from 'victory'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import reshader from 'reshader'
import * as service from '../service'
import mapStyle from '../mapStyle.json'

const BASE_COLOR = '#D9B068'

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
      <h1>Coffeeeeeeee challenge</h1>

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

      <MapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '600px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />

      <div className="footer">
      </div>

      <style jsx>{`
        .content { 
          font-family: 'Lato', sans-serif;
          max-width: 1200px;
          margin: 0 auto;
        }

        h1 { 
          font-family: 'Lobster', cursive;
          font-size: 5em;
          letter-spacing: 0.03em;
          color: #2B1C02;
        }

        .charts {
          display: flex;
        }

        .chart {
          flex: 1;
        }

        .legend {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .footer {
          height: 80px;
        }
      `}</style>
    </div>
  )
}

Index.getInitialProps = async () => {
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
