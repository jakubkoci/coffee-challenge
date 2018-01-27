import * as service from './service'

test('getChartData', () => {
  expect(service.getChartData())
    .toEqual([
      { type: 'flatwhite', count: 41 },
      { type: 'espresso', count: 16 },
      { type: 'filtercoffee', count: 15 },
      { type: 'cappuccino', count: 13 },
      { type: 'espressomacchiato', count: 7 },
      { type: 'mocha', count: 4 },
      { type: 'espresso doppio', count: 2 },
      { type: 'instantcoffee', count: 1 },
    ])
})