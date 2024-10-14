function sum(array: number[], i = 0, result = 0): number {
    if(array.length === i) {
        return result;
    }else{
        return sum(array, i + 1, result + array[i]);
    }
}

console.log(sum([1, 2, 3, 4, 5]));
