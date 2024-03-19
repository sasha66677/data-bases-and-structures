import assert from "assert"

/** Метод `map` применяет функцию проекции к каждому элементу массива 
  * и возвращает новый массив с результатами выполнения этой функции 
  * для каждого элемента исходного массива.
  */
function myMap(arr, projectionFn) {
  const mappedArray = []
  for (let i = 0; i < arr.length; i++) {
    mappedArray.push(projectionFn(arr[i], i, arr))
  }
  return mappedArray
}

/** Метод `filter` создает новый массив из всех элементов исходного массива,
  * для которых функция-предикат возвращает `true`.
  */
function myFilter(arr, predicateFn) {
  const filteredArray = []
  for (let i = 0; i < arr.length; i++) {
    if (predicateFn(arr[i], i, arr)) {
      filteredArray.push(arr[i])
    }
  }
  return filteredArray
}

/** Метод `reduce` применяет функцию-агрегатор к аккумулятору и 
 * каждому значению массива (слева направо), сводя их к одному значению.
 */
function myReduce(arr, aggregatorFn, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : arr[0]
  for (let i = initialValue !== undefined ? 0 : 1; i < arr.length; i++) {
    accumulator = aggregatorFn(accumulator, arr[i], i, arr)
  }
  return accumulator
}


const numbers = [1, 2, 3, 4, 5]
const numbersDefault = numbers

// умножение каждого числа на 2
const doubledNumbers = myMap(numbers, num => num * 2)
console.log("Doubled numbers:", doubledNumbers)
assert.equal(doubledNumbers.toString(), numbersDefault.map(num => num * 2).toString(), 'myMap works wrong')


// фильтрация четных чисел
const evenNumbers = myFilter(numbers, num => num % 2 === 0)
console.log("Even numbers:", evenNumbers)
assert.equal(evenNumbers.toString(), numbersDefault.filter(num => num % 2 === 0), 'myFilter works wrong')

// суммирование всех чисел
const sum = myReduce(numbers, (accumulator, currentValue) => accumulator + currentValue, 0)
console.log("Sum:", sum)
assert.equal(sum.toString(), numbersDefault.reduce((accumulator, currentValue) => accumulator + currentValue, 0), 'myReduce works wrong')
