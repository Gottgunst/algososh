import { nanoid } from 'nanoid';

class Node<T> {
  value: T;
  next: Node<T> | null;
  prev: Node<T> | null;
  id: string;
  constructor(value: T, next?: Node<T> | null, prev?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
    this.prev = prev === undefined ? null : prev;
    this.id = nanoid();
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  init(array: T[]) {
    array.forEach((el) => this.append(el));
  }

  prepend(element: T) {
    const node = new Node(element);

    if (this.head) {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    } else {
      this.head = this.tail = node;
    }
    this.size++;
  }

  shift() {
    if (this.head?.next) {
      this.head.next.prev = null;
      this.head = this.head.next;
      this.size--;
    } else this.clear();
  }

  append(element: T) {
    const node = new Node(element);

    if (this.tail === null) {
      if (this.head === null) {
        this.head = this.tail = node;
      } else {
        let curr = this.head;
        while (curr.next) {
          curr = curr.next;
        }
        curr.next = node;
        node.prev = curr;
        this.tail = node;
      }
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size++;
  }

  pop() {
    if (this.tail?.prev) {
      this.tail = this.tail?.prev;
      this.tail!.next = null;
      this.size--;
    } else this.clear();
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error('Некорректный индекс');
    } else {
      const node = new Node(element);

      if (index === 0) {
        this.prepend(element);
      } else if (index === this.size - 1 && index !== 1) {
        this.append(element);
      } else {
        const isFromHead = this.size / 2 - index > 0;

        let curr = isFromHead ? this.head : this.tail;
        let currIndex = isFromHead ? 0 : this.size - 1;

        if (isFromHead) {
          while (currIndex + 1 !== index) {
            curr = curr!.next;
            currIndex++;
          }
          if (curr) {
            node.next = curr.next;
            node.prev = curr;
            curr.next!.prev = node;
            curr.next = node;
          }
        } else {
          while (currIndex !== index) {
            curr = curr!.prev;
            currIndex--;
          }
          if (curr) {
            node.prev = curr.prev;
            node.next = curr;
            curr.prev!.next = node;
            curr.prev = node;
          }
        }
        this.size++;
      }
    }
  }

  removeAt(index: number) {
    if (index < 0 || index > this.size) {
      throw new Error('Некорректный индекс');
    } else {
      if (index === 0) {
        this.shift();
      } else if (index === this.size - 1) {
        this.pop();
      } else {
        const isFromHead = this.size / 2 - index > 0;
        let curr = isFromHead ? this.head : this.tail;
        let currIndex = isFromHead ? 0 : this.size - 1;

        if (isFromHead) {
          while (currIndex !== index) {
            curr = curr!.next;
            currIndex++;
          }
          if (curr) {
            curr.prev!.next = curr.next;
            curr.next!.prev = curr.prev;
          }
        } else {
          while (currIndex !== index) {
            curr = curr!.prev;
            currIndex--;
          }
          if (curr) {
            curr.prev!.next = curr.next;
            curr.next!.prev = curr.prev;
          }
        }
        this.size--;
      }
    }
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  getList() {
    let curr = this.head;
    const list = [];

    while (curr) {
      list.push({ data: curr.value, id: curr.id });
      curr = curr.next;
    }
    return list as TArrWithId<T>[];
  }
}

/* #######################
========== Типы ==========
####################### */
interface ILinkedList<T> {
  prepend: (element: T) => void;
  append: (element: T) => void;
  init: (array: T[]) => void;
  insertAt: (element: T, index: number) => void;
  pop: () => void;
  shift: () => void;
  removeAt: (index: number) => void;
  clear: () => void;
  getSize: () => number;
  getList: () => TArrWithId<T>[];
}

export type TArrWithId<T> = {
  data: T;
  id: string;
};
