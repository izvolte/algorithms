// Класс кучи (Heap)
// Реализована минимальная куча (min‑heap), где родительский ключ меньше или равен ключам детей.
class Heap {
    // Массив для хранения элементов кучи
    private heap: number[];

    constructor() {
        this.heap = [];
    }

    // Возвращает индекс родителя для узла с индексом i
    parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    // Возвращает индекс левого ребенка для узла с индексом i
    leftChild(i: number): number {
        return 2 * i + 1;
    }

    // Возвращает индекс правого ребенка для узла с индексом i
    rightChild(i: number): number {
        return 2 * i + 2;
    }

    // Функция для обмена элементов в массиве
    swap(i: number, j: number): void {
        const temp: number = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    /**
     * Вставка нового ключа в кучу.
     * Добавляем ключ в конец массива и поднимаем его вверх (heapifyUp),
     * пока не будет выполнено свойство кучи.
     */
    insert(key: number): void {
        this.heap.push(key);
        this.heapifyUp(this.heap.length - 1);
    }

    // Поддержка свойства кучи при вставке: поднимаем элемент вверх, если он меньше родителя
    private heapifyUp(index: number): void {
        let currentIndex: number = index;
        while (currentIndex > 0) {
            const parentIndex: number = this.parent(currentIndex);
            if (this.heap[parentIndex] > this.heap[currentIndex]) {
                this.swap(parentIndex, currentIndex);
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    /**
     * Удаление ключа из кучи.
     * Находим индекс ключа, заменяем его последним элементом, удаляем последний элемент
     * и восстанавливаем свойство кучи (сначала опускаем вниз, затем, на всякий случай, поднимаем вверх).
     */
    delete(key: number): void {
        const index: number = this.heap.indexOf(key);
        if (index === -1) {
            console.log(`Ключ ${key} не найден в куче.`);
            return;
        }
        const lastIndex: number = this.heap.length - 1;
        if (index !== lastIndex) {
            this.swap(index, lastIndex);
        }
        this.heap.pop();
        this.heapifyDown(index);
        this.heapifyUp(index);
    }

    // Восстанавливаем свойство кучи, опуская элемент вниз
    private heapifyDown(index: number): void {
        let currentIndex: number = index;
        const length: number = this.heap.length;
        while (true) {
            const left: number = this.leftChild(currentIndex);
            const right: number = this.rightChild(currentIndex);
            let smallest: number = currentIndex;
            if (left < length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            if (smallest !== currentIndex) {
                this.swap(currentIndex, smallest);
                currentIndex = smallest;
            } else {
                break;
            }
        }
    }
}

export default Heap;
