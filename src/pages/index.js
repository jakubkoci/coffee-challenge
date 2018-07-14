import React from 'react'
import * as service from '../service'
import Header from '../components/Header'
import Charts from '../components/Charts'
import Map from '../components/Map'

const Index = ({ chartsData, locationsData }) => {
  return (
    <div className="content">
      <Header text="Coffee challenge" />
      <Charts chartsData={chartsData} />
      <Map locationsData={locationsData} />

      <style jsx>{`
        .content { 
          font-family: 'Lato', sans-serif;
          max-width: 68.750em;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}

Index.getInitialProps = () => {
  const chartsData = service.getChartsData()
  const locationsData = service.getLocationsData()
  return { chartsData, locationsData }
}

export default Index
