import { Worker } from 'worker_threads';
import { quickSort } from '../../lesson4/quick-sort';
import * as path from 'path';
import * as fs from 'fs';
import {generateTrillionRandomArray} from "../../lesson4/generate";

/**
 * Порождает воркер, который сортирует массив,
 * если позволяет глубина параллелизации.
 */
function parallelQuickSort(arr: number[], maxDepth = 2): Promise<number[]> | number[] {
    if(maxDepth === 0) return quickSort(arr)

    return new Promise((resolve, reject) => {
        if (arr.length < 2 || maxDepth <= 0) {
            // Если массив короткий или глубина параллелизации исчерпана,
            // сортируем «обычным» квик-сортом
            resolve(quickSort(arr));
            return;
        }

        // Запускаем воркер
        const worker = new Worker(path.join(__dirname, './quickSortWorker.js'), {
            workerData: { arr, maxDepth }
        });

        worker.on('message', (sorted: number[]) => {
            resolve(sorted)
        });
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

//
const filePaths = ["../../lesson4/small.json", "../../lesson4/medium.json", "../../lesson4/large.json"];
//
// filePaths.forEach((filePath) => {
//     (async () => {
//         const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as number[];
//         const start = performance.now();
//         await parallelQuickSort(data, 0);
//         const duration = (performance.now() - start) / 1000;
//
//         console.log(`Execution time for ${filePath} length ${data.length}: ${duration.toFixed(3)} seconds`);
//     })();
// });


// filePaths.forEach((filePath) => {
//         const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as number[];
//
//         const start = performance.now();
//         const sortedData = quickSort(data); // Perform merge sort
//         const duration = (performance.now() - start) / 1000;
//
//         console.log(`Execution time for ${filePath} length ${data.length}: ${duration.toFixed(3)} seconds`);
// });




(async () => {
    const data = generateTrillionRandomArray(42, 5_000_000);
    //
    const start = performance.now();
    const sortedData = await parallelQuickSort(data, 2); // Perform merge sort
    const duration = (performance.now() - start) / 1000;

    console.log(`Execution time for length ${data.length}: ${duration.toFixed(3)} seconds`);
})();



// const start = performance.now();
// const sortedData = quickSort(data); // Perform merge sort
// const duration = (performance.now() - start) / 1000;
//
// console.log(`Execution time for length ${data.length}: ${duration.toFixed(3)} seconds`);