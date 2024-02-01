export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(null);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Превышена максимальная длина очереди');
    }

    this.container[this.length] = item;
    if (this.length > 0) this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('В очереди нет элементов');
    }

    this.container[this.head] = null;

    if (this.head === this.tail) {
      this.head = 0;
      this.tail = 0;
      this.length = 0;
    } else this.head++;
  };

  peak = () => {
    if (this.isEmpty()) {
      throw new Error('В очереди нет элементов');
    }
    return this.container[this.head];
  };

  clear = () => {
    this.container = Array(this.size).fill(null);
    this.head = 0;
    this.length = 0;
    this.tail = 0;
  };

  isEmpty = () => this.length === 0;
  getArray = () => this.container;
  getCoords = () => [this.length, this.head, this.tail] as TCoordsTuples;
}

/* #######################
========== Типы ==========
####################### */
interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  clear: () => void;
  getArray: () => (T | null)[];
  getCoords: () => TCoordsTuples;
}

type TCoordsTuples = [length: number, head: number, tail: number];
