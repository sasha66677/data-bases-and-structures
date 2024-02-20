import { DataStructureCommonInterface } from './common';

type LinkedListNode = {
  value: number;
  next: LinkedListNode | null;
};

export function createLinkedList(length: number): DataStructureCommonInterface {
  let last: LinkedListNode = null;
  let first: LinkedListNode = null;

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 100);
    const node: LinkedListNode = { value: randomNumber, next: null };

    if (first === null && last === null) {
      first = node;
      last = node;
    } else {
      last.next = node;
      last = node;
    }
  }

  return {
    getLength() {
      let counter = 0;
      let node = first;
      while (node !== null) {
        node = node.next;
        counter++;
      }
      return counter;
    },
    getByIndex(i) {
      let counter = 0;
      let node = first;
      while (node !== null) {
        if (counter === i) {
          return node.value;
        }
        node = node.next;
        counter++;
      }
      return undefined; // если индекс выходит за границы списка
    },
    setByIndex(i, v) {
      let counter = 0;
      let node = first;
      while (node !== null) {
        if (counter === i) {
          node.value = v;
          return;
        }
        node = node.next;
        counter++;
      }
    },
    contains(element) {
      let node = first;
      while (node !== null) {
        if (node.value === element) {
          return true;
        }
        node = node.next;
      }
      return false;
    },
    deleteFirst(element) {
      let node = first;
      let prev = null;
      while (node !== null) {
        if (node.value === element) {
          if (prev === null) {
            first = node.next;
          } else {
            prev.next = node.next;
          }
          return;
        }
        prev = node;
        node = node.next;
      }
    },
    insert(element) {
      const node: LinkedListNode = { value: element, next: first };
      first = node;
    },
  };
}
