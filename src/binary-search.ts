function binarySearch<T>(list: T[], item: T): number | null {
    let low = 0;
    let high = list.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const guess = list[mid];

        if (guess === item) {
            return mid;
        }

        if (guess > item) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return null;
}

binarySearch([1, 3, 5, 7, 9], 5); // Output: 2
binarySearch([1, 3, 5, 7, 9], 10); // Output: null