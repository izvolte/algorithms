import fs from "fs";

function quickSortInPlace<T>(array: T[], low = 0, high = array.length - 1): T[] {
    if (low < high) {
        const pivotIndex = partition(array, low, high);
        quickSortInPlace(array, low, pivotIndex - 1);
        quickSortInPlace(array, pivotIndex + 1, high);
    }
    return array;
}

function partition<T>(array: T[], low: number, high: number): number {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
}


const filePaths = ["./small.json", "./medium.json", "./large.json"];

filePaths.forEach((filePath) => {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as number[];

    const start = performance.now();
    const sortedData = quickSortInPlace(data); // Perform merge sort
    const duration = (performance.now() - start) / 1000;

    console.log(`Execution time for ${filePath} length ${data.length}: ${duration.toFixed(3)} seconds`);
});