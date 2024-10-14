function getLength(array: number[], i = 0): number {
    if(array.length === i) {
        return i;
    }else{
        return getLength(array, i + 1);
    }
}

console.log(getLength([1, 2, 3, 4, 5]));