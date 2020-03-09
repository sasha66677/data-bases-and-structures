import {DataStructureCommonInterface} from './common'

type LinkedListNode = {
  value: number
  next: LinkedListNode | null
}

export function createLinkedList(length: number): DataStructureCommonInterface {
  let last: LinkedListNode = null
  let first: LinkedListNode = null
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 100)
    const node: LinkedListNode = {value: randomNumber, next: null}
    if (first === null && last === null) {
      first = node
      last = node
    } else {
      last.next = node
      last = node
    }
  }

  return {
    getLength() {
      let counter = 0
      let node = first
      while (node !== null) {
        node = node.next
        counter++
      }
      return counter
    },
    getByIndex(i) {
      // TODO: тут какой-то реальный код
      return 0
    },
    setByIndex(i, v) {
      // TODO: тут какой-то реальный код
    },
    contains(element) {
      // TODO: тут какой-то реальный код
      return false
    },
    deleteFirst(element) {
      // TODO: тут какой-то реальный код
      return 0
    },
    insert(element) {
      // TODO: тут какой-то реальный код
      return 0
    }
  }
}
