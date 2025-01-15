function euclideanDistance(vectorA: number[], vectorB: number[]) {
    if (vectorA.length !== vectorB.length) {
        throw new Error("Vectors must have the same dimensions.");
    }

    // Разность между компонентами и их квадрат
    const sumOfSquares = vectorA.reduce((sum, a, i) => {
        const difference = a - vectorB[i];
        return sum + difference * difference;
    }, 0);

    // Корень из суммы квадратов разностей
    return Math.sqrt(sumOfSquares);
}

// Пример использования
const v1 = [1, 2, 3];
const v2 = [4, 5, 6];

const distance = euclideanDistance(v1, v2);
console.log("Euclidean Distance:", distance);
