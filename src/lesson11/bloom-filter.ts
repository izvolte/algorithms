class BloomFilter {
    private size: number;
    private hashCount: number;
    private bitArray: Uint8Array;

    constructor(size: number, hashCount: number) {
        this.size = size;
        this.hashCount = hashCount;
        // Инициализируем массив битов размером size.
        this.bitArray = new Uint8Array(size);
    }

    // Первая хеш-функция на основе алгоритма djb2.
    private hash1(str: string): number {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i); // hash * 33 + c
            hash = hash & hash; // Приведение к 32-битному целому
        }
        return Math.abs(hash);
    }

    // Вторая хеш-функция на основе алгоритма sdbm.
    private hash2(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
            hash = hash & hash; // Приведение к 32-битному целому
        }
        return Math.abs(hash);
    }

    // Метод для добавления элемента в фильтр.
    public add(item: string): void {
        const h1 = this.hash1(item);
        const h2 = this.hash2(item);
        for (let i = 0; i < this.hashCount; i++) {
            const index = (h1 + i * h2) % this.size;
            this.bitArray[index] = 1;
        }
    }

    // Метод для проверки наличия элемента (вероятностная проверка).
    public contains(item: string): boolean {
        const h1 = this.hash1(item);
        const h2 = this.hash2(item);
        for (let i = 0; i < this.hashCount; i++) {
            const index = (h1 + i * h2) % this.size;
            if (this.bitArray[index] === 0) {
                return false;
            }
        }
        return true;
    }
}

// Пример использования:
const bloom = new BloomFilter(1000, 4);
bloom.add("hello");
console.log(bloom.contains("hello")); // Выведет: true
console.log(bloom.contains("world")); // Выведет: false (скорее всего)
