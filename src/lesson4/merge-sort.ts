import * as fs from "fs";

function mergeSort<T>(array: T[]): T[] {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const leftArray = array.slice(0, middle);
  const rightArray = array.slice(middle);

  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

function merge<T>(left: T[], right: T[]): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

const filePaths = ["./small.json", "./medium.json", "./large.json"];

filePaths.forEach((filePath) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as number[];

  const start = performance.now();
  const sortedData = mergeSort(data); // Perform merge sort
  const duration = (performance.now() - start) / 1000;

  console.log(`Execution time for ${filePath} length ${data.length}: ${duration.toFixed(3)} seconds`);
});