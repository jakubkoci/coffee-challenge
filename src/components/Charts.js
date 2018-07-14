import React from 'react'
import { VictoryBar, VictoryPie, VictoryTooltip } from 'victory'
import reshader from 'reshader'

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

const Charts = ({ chartsData }) => {

  const colors = getColors(BASE_COLOR)

  return (
    <div className="charts">
      <div className="chart">
        <VictoryBar 
          style={{ data: { fill: d => d.color } }}
          data={withLabels(withColors(colors)(chartsData))} 
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
          data={withLabels(withColors(colors)(chartsData))} 
          x="type"
          y="count"
        />
      </div>
      <div className="legend">
        <table>
          <tbody>
            {withColors(colors)(chartsData).map(item => {
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
          </tbody>
        </table>
      </div>

      <style jsx>{`
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

        @media screen and (min-width: 600px) {
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
          .charts {
            padding: 2em 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Charts