import { DataStructureCommonInterface } from './common';

export function createMap(length: number): DataStructureCommonInterface {
  const map = new Map<number, number>();
  for (let i = 0; i < length; i++) {
    const key = Math.floor(Math.random() * 100);
    map.set(key, key);
  }

  return {
    getLength() {
      return map.size;
    },
    getByIndex(i) {
      return Array.from(map.values())[i];
    },
    setByIndex(i, element) {
      const keys = Array.from(map.keys());
      const key = keys[i];
      map.set(key, element);
    },
    contains(element) {
      return map.has(element);
    },
    insert(element) {
      map.set(element, element);
    },
    deleteFirst(element) {
      map.delete(element);
    }
  };
}