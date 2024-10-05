function findSmallest(arr: number[]): number {
    let smallest = arr[0];
    let smallestIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < smallest) {
            smallest = arr[i];
            smallestIndex = i;
        }
    }

    return smallestIndex;
}
function selectionSort(arr: number[]): number[] {
    const newArr: number[] = [];

    while (arr.length > 0) {
        const smallest = findSmallest(arr);
        newArr.push(arr.splice(smallest, 1)[0]);
    }

    return newArr;
}

console.log(selectionSort([5, 3, 6, 2, 10]));

// 1. какая временная сложность?
// 2. какая пространнственная сложность?
// 3. можно ли чуть упростить временную сложность не изменяю общей сути?*

// https://leetcode.com/problems/sort-an-array/description/ - попробуй написать по памяти*