import { workerData, parentPort } from 'worker_threads';
import { Worker } from 'worker_threads';
import { quickSort } from '../../lesson4/quick-sort';
import * as path from 'path';

interface WorkerData {
    arr: number[];
    maxDepth: number;
}

// «Параллельная» быстрая сортировка: при достаточной глубине порождаем новых воркеров
async function parallelQuickSort(arr: number[], maxDepth: number): Promise<number[]> {
    if (arr.length < 2) return arr;
    if (maxDepth <= 1) {
        // Переходим на обычный квик-сорт без параллелизма
        return quickSort(arr);
    }

    const pivot = arr[0];
    const left: number[] = [];
    const right: number[] = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // Порождаем двух воркеров для сортировки левой и правой частей
    const leftWorker = new Worker(path.join(__dirname, 'quickSortWorker.js'), {
        workerData: { arr: left, maxDepth: maxDepth - 1 }
    });
    const rightWorker = new Worker(path.join(__dirname, 'quickSortWorker.js'), {
        workerData: { arr: right, maxDepth: maxDepth - 1 }
    });

    // Дожидаемся, пока оба воркера вернут отсортированные подмассивы
    const [sortedLeft, sortedRight] = await Promise.all([
        new Promise<number[]>((resolve, reject) => {
            leftWorker.on('message', resolve);
            leftWorker.on('error', reject);
        }),
        new Promise<number[]>((resolve, reject) => {
            rightWorker.on('message', resolve);
            rightWorker.on('error', reject);
        }),
    ]);

    // Собираем итоговый массив
    return [...sortedLeft, pivot, ...sortedRight];
}

// Точка входа для воркера: читаем данные и шлём результат обратно
(async () => {
    const { arr, maxDepth } = workerData as WorkerData;
    const result = await parallelQuickSort(arr, maxDepth);
    parentPort?.postMessage(result);
})();
