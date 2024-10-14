function quicksort(array: number[]): number[]{
    if(array.length < 2){
        return array
    }else{
        const pivot = array[0];
        const less = array.slice(1).filter(item => item <= pivot);
        const greater = array.slice(1).filter(item => item > pivot);
        return [...quicksort(less), pivot, ...quicksort(greater)];
    }
}

console.log(quicksort([1,43,444444,4,5]))