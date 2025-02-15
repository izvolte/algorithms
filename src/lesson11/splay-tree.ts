// Класс узла Splay-дерева
class SplayTreeNode {
    key: number;
    left: SplayTreeNode | null;
    right: SplayTreeNode | null;

    constructor(key: number) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

// Правый поворот
function rotateRight(x: SplayTreeNode): SplayTreeNode {
    if (x.left === null) {
        throw new Error("rotateRight вызван для узла без левого потомка");
    }
    const y = x.left;
    x.left = y.right;
    y.right = x;
    return y;
}

// Левый поворот
function rotateLeft(x: SplayTreeNode): SplayTreeNode {
    if (x.right === null) {
        throw new Error("rotateLeft вызван для узла без правого потомка");
    }
    const y = x.right;
    x.right = y.left;
    y.left = x;
    return y;
}

/**
 * Функция splay:
 * Перемещает узел с заданным ключом (или последний посещённый узел, если ключ не найден)
 * в корень дерева, используя рекурсивные повороты.
 */
function splay(
    root: SplayTreeNode | null,
    key: number
): SplayTreeNode | null {
    if (root === null || root.key === key) {
        return root;
    }

    // Если ключ меньше, чем ключ корня — работаем с левым поддеревом
    if (key < root.key) {
        if (root.left === null) return root;
        const left = root.left;
        // Zig-Zig (левый левый случай)
        if (key < left.key) {
            left.left = splay(left.left, key);
            root = rotateRight(root);
        }
        // Zig-Zag (левый правый случай)
        else if (key > left.key) {
            left.right = splay(left.right, key);
            if (left.right !== null) {
                // Обязательно используем уже проверенный узел left
                root.left = rotateLeft(left);
            }
        }
        return root.left === null ? root : rotateRight(root);
    }
    // Если ключ больше, чем ключ корня — работаем с правым поддеревом
    else {
        if (root.right === null) return root;
        const right = root.right;
        // Zig-Zig (правый правый случай)
        if (key > right.key) {
            right.right = splay(right.right, key);
            root = rotateLeft(root);
        }
        // Zig-Zag (правый левый случай)
        else if (key < right.key) {
            right.left = splay(right.left, key);
            if (right.left !== null) {
                root.right = rotateRight(right);
            }
        }
        return root.right === null ? root : rotateLeft(root);
    }
}

class SplayTree {
    root: SplayTreeNode | null;

    constructor() {
        this.root = null;
    }

    /**
     * Поиск ключа в дереве.
     * Если ключ найден, он перемещается в корень.
     */
    search(key: number): SplayTreeNode | null {
        this.root = splay(this.root, key);
        return this.root !== null && this.root.key === key ? this.root : null;
    }

    /**
     * Вставка нового ключа в Splay-дерево.
     */
    insert(key: number): void {
        if (this.root === null) {
            this.root = new SplayTreeNode(key);
            return;
        }
        this.root = splay(this.root, key);
        if (this.root !== null && this.root.key === key) {
            console.log(`Ключ ${key} уже существует в дереве.`);
            return; // Дубликаты не разрешены
        }
        const newNode = new SplayTreeNode(key);
        if (this.root !== null && key < this.root.key) {
            newNode.right = this.root;
            newNode.left = this.root.left;
            this.root.left = null;
        } else if (this.root !== null) {
            newNode.left = this.root;
            newNode.right = this.root.right;
            this.root.right = null;
        }
        this.root = newNode;
    }

    /**
     * Удаление ключа из Splay-дерева.
     */
    delete(key: number): void {
        if (this.root === null) return;
        this.root = splay(this.root, key);
        if (this.root === null || this.root.key !== key) {
            console.log(`Ключ ${key} не найден в дереве.`);
            return;
        }
        if (this.root.left === null) {
            this.root = this.root.right;
        } else {
            const temp = this.root.right;
            this.root = this.root.left;
            this.root = splay(this.root, key);
            if (this.root !== null) {
                this.root.right = temp;
            }
        }
    }
}

export default SplayTree;
