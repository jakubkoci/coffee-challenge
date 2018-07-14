import jakubovastovka from './data/jakubovastovka.json'
import locations from './data/locations.json'

const coffeeTypes = {
  'cappuccino': [ 
    'bananacappuccino', 'cappuccino', 'cappucino' 
  ],
  'mocha': [ 
    'mocha', 'mochacoffee', 'cafemocha' 
  ],
  'espressomacchiato': [ 
    'caramelmacchiato', 'espressomacchiato', 'espressomachiato', 'esspressomachiato', 'icedcaramelmachiato' 
  ],
  'filtercoffee': [
    'filtercoffee' 
  ],
  'flatwhite': [ 
    'flatwhite', 'icedflatwhite' 
  ],
  'instantcoffee': [ 
    'instantcoffee' 
  ],
  'espresso': [ 
    'espresso', 'esspresso', 'esspressogrande' 
  ],
  'espresso doppio': [ 
    'doubleespresso', 'doubleesspresso' 
  ],
}

export function getChartsData() {
  const allTagsMap = jakubovastovka.map(instagramEntry => instagramEntry.tags).reduce((tmpTagsMap, photoTagsArray) => {
    photoTagsArray.reduce((tagsMap, photoTag) => {
      if (tagsMap[photoTag]) {
        tagsMap[photoTag] = tagsMap[photoTag] + 1 
      } else {
        tagsMap[photoTag] = 1
      }
      return tagsMap
    }, tmpTagsMap)
    return tmpTagsMap
  }, {})

  const tags = Object.keys(allTagsMap).reduce((tags, tag) => {
    const key = Object.keys(coffeeTypes).find(key => coffeeTypes[key].includes(tag))
    if (key) {
      return { ...tags, [key]: tags[key] + allTagsMap[tag] }
    }
    return tags
  }, initTags(coffeeTypes))

  const chartData = Object.keys(tags)
    .reduce((array, tag) => {
      return [ ...array, { type: tag, count: tags[tag] } ]
    }, [])
    .sort((chartDataItemA, chartDataItemB) => {
      return chartDataItemB.count - chartDataItemA.count
    })

  return chartData
}

export function getLocationsData() {
  return locations.filter(location => location && location.lat && location.lng)
}

function initTags(types) {
  return Object.keys(types).reduce((initTags, type) => {
    return { ...initTags, [type]: 0 }
  }, {})
}
