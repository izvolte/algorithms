function factorial(n: number): number {
    if (n <= 1) {
        return 1;  // базовый случай
    }
    return n * factorial(n - 1);  // рекурсивный вызов
}

console.log(factorial(10000)); // Вывод: 120


// → 5 * factorial(4)
// → 5 * (4 * factorial(3))
// → 5 * (4 * (3 * factorial(2)))
// → 5 * (4 * (3 * (2 * factorial(1))))
// → 5 * (4 * (3 * (2 * 1)))                   // базовый случай: factorial(1) = 1
// → 5 * (4 * (3 * 2))
// → 5 * (4 * 6)
// → 5 * 24
// → 120


















// Верх стека (последний вызов)
// | factorial(5) |
// | factorial(4) |
// | factorial(3) |
// | factorial(2) |
// | factorial(1) |
// Низ стека (первый вызов)
// → 120