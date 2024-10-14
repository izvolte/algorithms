function max(array: number[], i = 0, result = 0): number {
    if(array.length === i) {
        return result;
    }else{
        return max(array, i + 1, array[i] < result ? result : array[i]);
    }
}

console.log(max([1, 2, 3, 4, 5]));