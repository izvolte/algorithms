export class Deque<T> {
    private items: { [key: number]: T } = {};
    private front: number = 0;
    private rear: number = 0;

    add(element: T): void {
        this.items[this.rear] = element;
        this.rear++;
    }

    get(): T {
        if (this.isEmpty()) {
            throw new Error("Deque is empty");
        }
        const element = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return element;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    size(): number {
        return this.rear - this.front;
    }
}

// const deque = new Deque<number>();

// deque.add(1);  // [1]
// deque.add(2);   // [1, 2]
// deque.add(3);   // [1, 2, 3]
// console.log("size:" + deque.size()); // 2
//
// console.log(deque.get()); // 1
// console.log(deque.get()); // 2
// console.log("size:" + deque.size()); // 0
