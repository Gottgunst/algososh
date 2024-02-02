import { TArrWithId, arrWithMemo } from '../utils/arrWithMemo';

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T) => {
    this.container[this.container.length] = item;
  };

  pop = () => {
    this.container.length--;
  };

  clear = () => {
    this.container = [];
  };

  peak = () => {
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
  getArray: () => TArrWithId<T>[];
}
