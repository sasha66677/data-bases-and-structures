
import { DataStructureCommonInterface } from './common';

export function createObject(length: number): DataStructureCommonInterface {
  const obj: Record<string, number> = {};
  for (let i = 0; i < length; i++) {
    const key = Math.random().toString(36).substring(7);
    obj[key] = Math.floor(Math.random() * 100);
  }

  return {
    getLength() {
      return Object.keys(obj).length;
    },
    getByIndex(i) {
      const keys = Object.keys(obj);
      const key = keys[i];
      return obj[key];
    },
    setByIndex(i, element) {
      const keys = Object.keys(obj);
      const key = keys[i];
      obj[key] = element;
    },
    contains(element) {
      return obj.hasOwnProperty(element);
    },
    insert(element) {
      obj[element] = Math.floor(Math.random() * 100);
    },
    deleteFirst(element) {
      delete obj[element];
    }
  };
}