function cosineSimilarity(vectorA: number[], vectorB: number[]) {
    if (vectorA.length !== vectorB.length) {
        throw new Error("Vectors must have the same dimensions.");
    }

    // Скалярное произведение - сумма произведений соответствующих элементов двух векторов
    const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);

    // Длина (норма) векторов - квадратный корень из суммы квадратов всех элементов вектора
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));

    if (magnitudeA === 0 || magnitudeB === 0) {
        throw new Error("Vectors must not be zero vectors.");
    }

    // Косинусное сходство - отношение скалярного произведения к произведению норм двух векторов
    return dotProduct / (magnitudeA * magnitudeB);
}

const vector1 = [1, 2, 3];
const vector2 = [4, 5, 6];

const similarity = cosineSimilarity(vector1, vector2);
console.log("Cosine Similarity:", similarity);
