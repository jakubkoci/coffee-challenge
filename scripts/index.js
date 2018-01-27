const fs = require('fs')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const convertToJson = require('./convertToJson')
const coffeeData = require('../src/data/jakubovastovka.json')
const locationsData = require('../src/data/locations.json')

function printLocationDataStats() {
  const locationsWithGps = locationsData.filter(location => location && (location.lat && location.lng))
  const locationsWithoutGps = locationsData.filter(location => location && (!location.lat || !location.lng))

  console.log('Locations with GPS: ', locationsWithGps.length)
  console.log('Locations without GPS: ', locationsWithoutGps.length)
}

function createLocationsDataFile() {
  enhanceLocations().then(locations => {
    fs.writeFile(path.join(__dirname, '../data/locations.json'), JSON.stringify(locations, null, 2), 'utf8', (error) => {
      if (error) throw error
      console.log('The file has been saved!')
    })
  })
}

async function enhanceLocations() {
  return await Promise.all(
    coffeeData.map(async entry => {
      const entryLocation = entry.location

      if (!entryLocation) {
        console.error('Entry has no location: ', entry)
        return null
      }

      const scrapedLocation = await scrapeLocation(entryLocation.id, entryLocation.name)

      if (!scrapedLocation) {
        console.error('Location not found: ', entryLocation)
        return entryLocation
      }

      const enhancedLocation = {
        ...entryLocation,
        ...scrapedLocation,
      }

      console.log('Location found: ', enhancedLocation)

      return enhancedLocation
    })
  )
}

async function scrapeLocation(locationId, title) {
  try {
    const { stdout, stderr } = await exec(`instagram-scraper --search-location "${title}"`)

    if (stderr) {
      console.error(stderr)
      return null
    }

    const locations = convertToJson(stdout)
    const location = locations.find(location => location['location-id'] == locationId && location['title'] === title)
    
    return location || null
  } catch (error) {
    console.error(error)
    return null
  }
}

// createLocationsDataFile()
printLocationDataStats()

module.exports = {
  createLocationsDataFile,
  printLocationDataStats,
}