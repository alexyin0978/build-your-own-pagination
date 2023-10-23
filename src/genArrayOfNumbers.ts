export const genArrayOfNumbers = (startNum: number, endNum: number) => {
  const length = endNum - startNum + 1;
  return Array.from({ length }, (_, i) => startNum + i);
};
