const convertToJson = require('./convertToJson')

test('convert to JSON', () => {
  expect(convertToJson('location-id: 13032887, title: Node5, subtitle: Radlicka 180/50, Prague, Czech Republic, city: Prague, Czech Republic, lat: 50.06635, lng: 14.40274\nlocation-id: 1034741846, title: node56, subtitle: Belper, city: Belper, lat: 53.02325, lng: -1.48643'))
    .toEqual([
      {
        'location-id': 13032887,
        'title': 'Node5',
        'lat': 50.06635, 
        'lng': 14.40274,
      },
      {
        'location-id': 1034741846,
        'title': 'node56',
        'lat': 53.02325, 
        'lng': -1.48643,
      },
    ])
})