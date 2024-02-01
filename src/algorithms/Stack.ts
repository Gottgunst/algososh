import { TArrWithIndex, arrWithMemo } from '../utils/arrWithMemo';

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container[this.container.length] = item;
  };

  pop = (): void => {
    this.container.length--;
  };

  clear = (): void => {
    this.container = [];
  };

  peak = (): T | null => {
    if (this.container.length > 0)
      return this.container[this.container.length - 1];
    return null;
  };

  getArray = () => arrWithMemo(this.container);
  getSize = () => this.container.length;
}

/* #######################
========== Типы ==========
####################### */
interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  peak: () => T | null;
  getSize: () => number;
  getArray: () => TArrWithIndex<T>[];
}
