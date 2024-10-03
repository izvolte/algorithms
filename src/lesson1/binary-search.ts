function binarySearch<T>(list: T[], item: T): number | null {
    let low = 0;
    let high = list.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (list[mid] === item) {
            return mid;
        }

        if (list[mid] > item) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return null;
}

console.log(binarySearch([1, 3, 5, 7, 9], 5));
console.log(binarySearch([1, 3, 5, 7, 9], 10));

const array50 = Array.from({ length: 50 }, (_item: unknown, z: number) => z + 1)

console.log(binarySearch(array50, 50));