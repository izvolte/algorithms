function binarySearch(array: number[], find: number, low = 0, max = array.length - 1) {
    let mid = Math.round((max + low) / 2)
    if (array[mid] === find) return mid
    if (low === max && max === mid) return false
    if (array[mid] < find) return binarySearch(array, find, mid + 1, max)
    if (array[mid] > find) return binarySearch(array, find, low, mid - 1)
}

console.log(binarySearch([1, 2, 3, 4, 5, 666], 1));
console.log(binarySearch([1, 2, 3, 4, 5, 666], 2));
console.log(binarySearch([1, 2, 3, 4, 5, 666], 3));
console.log(binarySearch([1, 2, 3, 4, 5, 666], 4));
console.log(binarySearch([1, 2, 3, 4, 5, 666], 5));
console.log(binarySearch([1, 2, 3, 4, 5, 666], 666));