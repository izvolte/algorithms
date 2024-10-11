function factorial2(n: number, accumulator: number = 1): number {
    if (n <= 1) {
        return accumulator;
    }
    return factorial2(n - 1, accumulator * n); // Хвостовой вызов
}

console.log(factorial2(5)); // Вывод: 120

// → factorial2(4, 5)
// → factorial2(3, 20)
// → factorial2(2, 60)
// → factorial2(1, 120) // базовый случай
// → возвращаем 120