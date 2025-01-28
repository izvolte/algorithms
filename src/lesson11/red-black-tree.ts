// Для удобства используем строки "RED" и "BLACK"
const RED = "RED";
const BLACK = "BLACK";

// Определим тип для удобства
type Color = typeof RED | typeof BLACK;

class RBNode {
    public key: number;      // Ключ
    public color: Color;     // Цвет узла (красный или чёрный)
    public left: RBNode | null;
    public right: RBNode | null;
    public parent: RBNode | null;

    constructor(key: number) {
        this.key = key;
        this.color = RED;  // Новый узел всегда изначально красный
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

export default class RedBlackTree {
    public root: RBNode | null;

    constructor() {
        this.root = null;
    }

    public insert(key: number): void {
        // 1. Обычная вставка в бинарное дерево поиска
        const newNode = new RBNode(key);
        if (this.root === null) {
            // Пустое дерево
            this.root = newNode;
        } else {
            let current: RBNode | null = this.root;
            let parent: RBNode | null = null;

            while (current !== null) {
                parent = current;
                if (key < current.key) {
                    current = current.left;
                } else if (key > current.key) {
                    current = current.right;
                } else {
                    // Если ключ уже есть, для простоты не вставляем дубликат
                    return;
                }
            }

            // Подвешиваем новый узел
            newNode.parent = parent;
            if (parent && key < parent.key) {
                parent.left = newNode;
            } else if (parent) {
                parent.right = newNode;
            }
        }

        // 2. Балансировка (fixup) после вставки
        this.fixInsert(newNode);
    }

    private fixInsert(node: RBNode): void {
        // Пока родитель — красный, надо исправлять
        while (node !== this.root && node.parent?.color === RED) {
            const parent = node.parent;
            const grandparent = parent.parent;

            if (!grandparent) break; // Без дедушки не сможем пойти дальше

            if (parent === grandparent.left) {
                // Дядя (правый ребёнок grandparent)
                const uncle = grandparent.right;
                if (uncle && uncle.color === RED) {
                    // 1) Дядя красный - просто перекрашиваем
                    parent.color = BLACK;
                    uncle.color = BLACK;
                    grandparent.color = RED;
                    node = grandparent; // поднимаемся вверх
                } else {
                    // 2) Дядя чёрный
                    if (node === parent.right) {
                        // 2a) "Зиг-заг": поворот влево вокруг родителя
                        this.rotateLeft(parent);
                        node = parent;
                    }
                    // Перезапрашиваем parent, т.к. node мог измениться
                    const newParent = node.parent;
                    const newGrandparent = newParent?.parent;
                    if (!newParent || !newGrandparent) break;

                    // 2b) "Зиг-зиг": поворот вправо вокруг дедушки + перекраска
                    newParent.color = BLACK;
                    newGrandparent.color = RED;
                    this.rotateRight(newGrandparent);
                }
            } else {
                // parent === grandparent.right
                const uncle = grandparent.left;
                if (uncle && uncle.color === RED) {
                    // 1) Дядя красный
                    parent.color = BLACK;
                    uncle.color = BLACK;
                    grandparent.color = RED;
                    node = grandparent;
                } else {
                    // 2) Дядя чёрный
                    if (node === parent.left) {
                        this.rotateRight(parent);
                        node = parent;
                    }
                    const newParent = node.parent;
                    const newGrandparent = newParent?.parent;
                    if (!newParent || !newGrandparent) break;

                    newParent.color = BLACK;
                    newGrandparent.color = RED;
                    this.rotateLeft(newGrandparent);
                }
            }
        }
        // Корень всегда чёрный
        if (this.root) {
            this.root.color = BLACK;
        }
    }

    // Поворот влево вокруг узла x
    private rotateLeft(x: RBNode): void {
        const y = x.right;
        if (!y) return; // Защита от null

        // 1) "поднимаем" левое поддерево y
        x.right = y.left;
        if (y.left) {
            y.left.parent = x;
        }

        // 2) Связываем y с родителем x
        y.parent = x.parent;
        if (!x.parent) {
            // x был корнем
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        // 3) Делаем x левым дочерним узлом y
        y.left = x;
        x.parent = y;
    }

    // Поворот вправо вокруг узла x
    private rotateRight(x: RBNode): void {
        const y = x.left;
        if (!y) return;

        x.left = y.right;
        if (y.right) {
            y.right.parent = x;
        }

        y.parent = x.parent;
        if (!x.parent) {
            this.root = y;
        } else if (x === x.parent.right) {
            x.parent.right = y;
        } else {
            x.parent.left = y;
        }

        y.right = x;
        x.parent = y;
    }

    // ===========
    // Удаление
    // ===========

    public delete(key: number): void {
        // Найдём узел, который хотим удалить
        const z = this.findNode(key);
        if (!z) return; // Узла с таким ключом нет, ничего не делаем

        let y = z; // y - узел, который фактически будет "убран" из дерева
        let yOriginalColor = y.color;
        let x: RBNode | null = null;

        if (z.left === null) {
            // У z только правый (или вовсе нет) ребёнок
            x = z.right;
            this.rbTransplant(z, z.right);
        } else if (z.right === null) {
            // У z только левый ребёнок
            x = z.left;
            this.rbTransplant(z, z.left);
        } else {
            // У z два ребёнка: ищем преемника (минимум в правом поддереве)
            const successor = this.minimum(z.right);
            y = successor;
            yOriginalColor = y.color;
            x = y.right;

            if (y.parent === z) {
                // Особый случай: successor — прямой ребёнок z
                if (x) {
                    x.parent = y;
                }
            } else {
                // Перенесём поддерево
                this.rbTransplant(y, y.right);
                y.right = z.right;
                if (y.right) {
                    y.right.parent = y;
                }
            }
            // Заменим z на y
            this.rbTransplant(z, y);
            y.left = z.left;
            if (y.left) {
                y.left.parent = y;
            }
            y.color = z.color;
        }

        // Если удалили чёрный узел, надо восстановить свойства
        if (yOriginalColor === BLACK && x) {
            this.fixDelete(x);
        }
    }

    /**
     * Поиск узла с данным ключом (вспомогательный метод).
     */
    private findNode(key: number): RBNode | null {
        let current = this.root;
        while (current !== null) {
            if (key < current.key) {
                current = current.left;
            } else if (key > current.key) {
                current = current.right;
            } else {
                return current; // Нашли
            }
        }
        return null; // Не нашли
    }

    /**
     * Наименьший элемент в поддереве (используется, например, для поиска преемника).
     */
    private minimum(node: RBNode): RBNode {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    /**
     * Стандартная "трансплантация" в красно-чёрном дереве:
     * Заменяет поддерево, корнем которого является u, на поддерево,
     * корнем которого является v. Узел u.parent перенаправляет свои
     * ссылки на v.
     */
    private rbTransplant(u: RBNode, v: RBNode | null): void {
        if (!u.parent) {
            // u был корнем
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        if (v) {
            v.parent = u.parent;
        }
    }

    /**
     * Восстановление свойств красно-чёрного дерева после удаления.
     */
    private fixDelete(x: RBNode): void {
        // Пока x не корень и x чёрный
        while (x !== this.root && this.getColor(x) === BLACK) {
            if (!x.parent) break; // На всякий случай

            if (x === x.parent.left) {
                let w = x.parent.right; // "брат" x
                if (this.getColor(w) === RED) {
                    // Случай 1: брат красный
                    if (w) w.color = BLACK;
                    x.parent.color = RED;
                    this.rotateLeft(x.parent);
                    w = x.parent.right;
                }
                // Случай 2: брат чёрный, и оба его ребёнка чёрные
                if (
                    this.getColor(w?.left) === BLACK &&
                    this.getColor(w?.right) === BLACK
                ) {
                    if (w) w.color = RED;
                    x = x.parent;
                } else {
                    // Случай 3: w чёрный, левый ребёнок красный, правый чёрный
                    if (this.getColor(w?.right) === BLACK) {
                        if (w?.left) w.left.color = BLACK;
                        if (w) w.color = RED;
                        if (w) this.rotateRight(w);
                        w = x.parent.right;
                    }
                    // Случай 4: w чёрный, правый ребёнок красный
                    if (w) w.color = x.parent.color;
                    x.parent.color = BLACK;
                    if (w?.right) w.right.color = BLACK;
                    this.rotateLeft(x.parent);
                    x = this.root as RBNode; // Вернёмся к корню
                }
            } else {
                // x === x.parent.right (симметричный случай)
                let w = x.parent.left;
                if (this.getColor(w) === RED) {
                    if (w) w.color = BLACK;
                    x.parent.color = RED;
                    this.rotateRight(x.parent);
                    w = x.parent.left;
                }
                if (
                    this.getColor(w?.right) === BLACK &&
                    this.getColor(w?.left) === BLACK
                ) {
                    if (w) w.color = RED;
                    x = x.parent;
                } else {
                    if (this.getColor(w?.left) === BLACK) {
                        if (w?.right) w.right.color = BLACK;
                        if (w) w.color = RED;
                        if (w) this.rotateLeft(w);
                        w = x.parent.left;
                    }
                    if (w) w.color = x.parent.color;
                    x.parent.color = BLACK;
                    if (w?.left) w.left.color = BLACK;
                    this.rotateRight(x.parent);
                    x = this.root as RBNode;
                }
            }
        }
        // Сделаем узел чёрным, чтобы в корне сохранились свойства
        x.color = BLACK;
    }

    /**
     * Утилита для безопасного получения цвета узла (если null, считаем чёрным).
     */
    private getColor(node?: RBNode | null): Color {
        if (!node) return BLACK;
        return node.color;
    }
}
