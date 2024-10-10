function factorial2(n: number, accumulator: number = 1): number {
    if (n <= 1) {
        return accumulator;
    }
    return factorial2(n - 1, accumulator * n); // Хвостовой вызов
}

console.log(factorial2(5)); // Вывод: 120

// → factorial(4, 5)
// → factorial(3, 20)
// → factorial(2, 60)
// → factorial(1, 120) // базовый случай
// → возвращаем 120