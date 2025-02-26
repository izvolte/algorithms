import * as fs from "fs";

export function quickSort<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[Math.floor(array.length / 2)];
    const left: T[] = [];
    const right: T[] = [];
    const equal: T[] = [];

    for (const element of array) {
        if (element < pivot) {
            left.push(element);
        } else if (element > pivot) {
            right.push(element);
        } else {
            equal.push(element);
        }
    }

    return [...quickSort(left), ...equal, ...quickSort(right)];
}


// const filePaths = ["./small.json", "./medium.json", "./large.json"];
//
// filePaths.forEach((filePath) => {
//     const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as number[];
//
//     const start = performance.now();
//     const sortedData = quickSort(data); // Perform merge sort
//     const duration = (performance.now() - start) / 1000;
//
//     console.log(`Execution time for ${filePath} length ${data.length}: ${duration.toFixed(3)} seconds`);
// });