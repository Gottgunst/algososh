export function calcFibonacci(index: number): number[] {
  const sequence = [
    1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987,
  ];

  if (sequence.length >= index) {
    return sequence.slice(0, Number(index) + 1);
  } else {
    while (sequence.length - 1 < index) {
      const lastIndex = sequence.length - 1;
      const preLastIndex = sequence.length - 2;

      sequence.push(sequence[lastIndex] + sequence[preLastIndex]);
    }
    return sequence;
  }
}
