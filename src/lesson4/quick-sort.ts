function quickSort<T>(array: T[]): T[] {
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

console.log(quickSort([38, 27, 43, 3, 9, 82, 10]))