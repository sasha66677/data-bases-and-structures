import { DataStructureCommonInterface } from './common';

export function createSet(length: number): DataStructureCommonInterface {
  const set = new Set<number>()
  for (let i = 0; i < length; i++) {
    set.add(Math.floor(Math.random() * 100))
  }

  return {
    getLength() {
      return set.size;
    },
    getByIndex(i) {
      return Array.from(set)[i]
    },
    setByIndex(i, element) {
      const values = Array.from(set)
      values[i] = element
      set.clear()
      values.forEach(value => set.add(value))
    },
    contains(element) {
      return set.has(element)
    },
    insert(element) {
      set.add(element)
    },
    deleteFirst(element) {
      set.delete(element)
    }
  }
}