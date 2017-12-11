module.exports = convertToJson

function convertToJson(inputString) {
  const lines = inputString.split('\n')
  return lines.map(lineToObject)
}

function lineToObject(line) {
  return line.split(',').reduce((location, keyValueString) => {
    const [ keyCandidate, valueCandidate ] = keyValueString.split(':')

    if (!valueCandidate) {
      return { ...location }
    }
    
    const key = keyCandidate.trim()
    const value = Number(valueCandidate.trim()) || valueCandidate.trim()

    const allowedKeys = [ 'location-id', 'title', 'lat', 'lng' ]
    if (!allowedKeys.includes(key)) {
      return { ...location }
    }

    return { ...location, [key]: value }
  }, {})
}