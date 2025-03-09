class HyperLogLog {
    private p: number;           // Количество битов для индекса (precision)
    private m: number;           // Количество регистров = 2^p
    private registers: Uint8Array; // Массив регистров
    private alphaMM: number;     // Константа alpha * m^2

    constructor(p: number = 14) {
        this.p = p;
        this.m = 1 << p; // m = 2^p
        this.registers = new Uint8Array(this.m);

        // Вычисление константы alpha в зависимости от m:
        let alpha: number;
        if (this.m === 16) {
            alpha = 0.673;
        } else if (this.m === 32) {
            alpha = 0.697;
        } else if (this.m === 64) {
            alpha = 0.709;
        } else {
            alpha = 0.7213 / (1 + 1.079 / this.m);
        }
        this.alphaMM = alpha * this.m * this.m;
    }

    /**
     * Функция хэширования (FNV-1a 32-бит) для преобразования входного значения в 32-битное число.
     */
    private hash(value: unknown): number {
        const str = typeof value === "string" ? value : JSON.stringify(value);
        let hash = 2166136261;
        for (let i = 0; i < str.length; i++) {
            hash ^= str.charCodeAt(i);
            // Перемножение с FNV-примитивами
            hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
        }
        // Приведение к 32-битному беззнаковому целому
        return hash >>> 0;
    }

    /**
     * Функция для подсчёта позиции первой единицы в битовом представлении числа.
     * Если число равно нулю, возвращает (bits + 1).
     *
     * @param x Число для анализа.
     * @param bits Количество бит, которые анализируем.
     */
    private countLeadingZeros(x: number, bits: number): number {
        let count = 1;
        for (let i = bits - 1; i >= 0; i--) {
            if ((x & (1 << i)) !== 0) {
                return count;
            }
            count++;
        }
        return count;
    }

    /**
     * Добавление элемента в HyperLogLog.
     *
     * @param value Любое значение, которое можно преобразовать в строку.
     */
    public add(value: unknown): void {
        const hash = this.hash(value);
        // Извлекаем первые p бит как индекс
        const index = hash >>> (32 - this.p);
        // Остальные (32 - p) бит используются для определения "ранга"
        const remaining = (hash << this.p) >>> this.p;
        const rank = this.countLeadingZeros(remaining, 32 - this.p);

        // Обновляем регистр, если найден новый максимум
        if (rank > this.registers[index]) {
            this.registers[index] = rank;
        }
    }

    /**
     * Возвращает оценку количества уникальных элементов.
     */
    public count(): number {
        let sum = 0;
        let zeros = 0;
        for (let i = 0; i < this.m; i++) {
            sum += Math.pow(2, -this.registers[i]);
            if (this.registers[i] === 0) {
                zeros++;
            }
        }

        let estimate = this.alphaMM / sum;

        // Коррекция для маленького диапазона (если оценка достаточно мала)
        if (estimate <= (5 / 2) * this.m) {
            if (zeros !== 0) {
                estimate = this.m * Math.log(this.m / zeros);
            }
        }

        // Можно добавить коррекцию для большого диапазона, если необходимо.
        return estimate;
    }
}

// Пример использования:
const hll = new HyperLogLog(10); // 2^10 = 1024 регистра
// const elements = ["apple", "banana", "orange", "apple", "kiwi", "banana"];
const elements = ["apple", "banana", "cherry", "apple"];
for (const el of elements) {
    hll.add(el);
}

console.log("Оценка количества уникальных элементов:", hll.count());
