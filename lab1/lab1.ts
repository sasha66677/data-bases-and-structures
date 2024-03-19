import { plot, stack } from 'nodeplotlib'
import { DataStructureCommonInterface, timeStart, timeEnd } from './common'
import { createArray } from './createArray'
import { createLinkedList } from './createLinkedList'
import { createBtree } from './createBtree'
import { createSet } from './createSet'
import { createMap } from './createMap'
import { createObject } from './createObject'

function testStructure(
  factory: (length: number) => DataStructureCommonInterface
) {
  const sizesToTest = [
    10,
    100,
    1000,
    10000,
    100000,
    1000000,
    10000000,
    20000000,
    30000000
  ]

  const numberOfExperiments = 20

  const averageTimeMeasurements = {
    allocation: [],
    getLength: [],
    getByIndex: [],
    setByIndex: [],
    containsRandom: [],
    containsNonExisting: [],
    insertLast: [],
    deleteFirst: []
  }

  for (const length of sizesToTest) {
    const timeMeasurements = {
      allocation: [],
      getLength: [],
      getByIndex: [],
      setByIndex: [],
      containsRandom: [],
      containsNonExisting: [],
      insert: [],
      deleteFirst: []
    }
    console.log(`Проверка структуры из ${length} элементов`)
    for (const experimentNumber of [...Array(numberOfExperiments).keys()]) {
      console.log(`#${experimentNumber + 1}`)

      timeStart()
      const structure = factory(length)
      timeMeasurements.allocation.push(timeEnd())

      timeStart()
      structure.getLength()
      timeMeasurements.getLength.push(timeEnd())

      const randomIndex = Math.floor(Math.random() * length)
      timeStart()
      structure.getByIndex(randomIndex)
      timeMeasurements.getByIndex.push(timeEnd())

      timeStart()
      structure.setByIndex(randomIndex, 900)
      timeMeasurements.setByIndex.push(timeEnd())

      const randomElement = Math.floor(Math.random() * 100)
      timeStart()
      structure.contains(randomElement)
      timeMeasurements.containsRandom.push(timeEnd())

      timeStart()
      structure.contains(-1)
      timeMeasurements.containsNonExisting.push(timeEnd())

      timeStart()
      structure.insert(randomElement)
      timeMeasurements.insert.push(timeEnd())

      timeStart()
      structure.deleteFirst(randomElement)
      timeMeasurements.deleteFirst.push(timeEnd())
    }

    for (const key of Object.keys(timeMeasurements) as (keyof typeof timeMeasurements)[]) {
      if (!averageTimeMeasurements[key]) {
        averageTimeMeasurements[key] = []; // Инициализация массива, если он не определен
      }
      averageTimeMeasurements[key].push(
        timeMeasurements[key].reduce((x, y) => x + y) / numberOfExperiments
      )
    }

  }

  for (const chartName of Object.keys(averageTimeMeasurements)) {
    stack(
      [
        {
          x: sizesToTest,
          y: averageTimeMeasurements[chartName]
        }
      ],
      { title: chartName }
    )
  }

  plot()
}

let switcher = 1
switch (switcher) {
  case 1:
    testStructure(createArray)
    break
  case 2:
    testStructure(createSet)
    break
  case 3:
    testStructure(createMap)
    break
  case 4:
    testStructure(createObject)
    break
  case 5:
    testStructure(createLinkedList)
    break
  case 6:
    testStructure(createBtree)
    break
  default:
    console.log('Некорректный ввод')
}