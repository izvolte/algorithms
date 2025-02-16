interface Doc {
    id: string;
    text: string;
}

class InvertedIndex {
    private index: Map<string, Set<string>> = new Map();

    public addDoc(doc: Doc): void {
        // Приводим текст к нижнему регистру и разбиваем на слова
        const words = doc.text.toLowerCase().match(/\w+/g);
        if (!words) return;

        // Для каждого слова добавляем id документа в индекс
        for (const word of words) {
            if (!this.index.has(word)) {
                this.index.set(word, new Set());
            }
            this.index.get(word)?.add(doc.id);
        }
    }

    public search(word: string): string[] {
        const normalizedWord = word.toLowerCase();
        return Array.from(this.index.get(normalizedWord) ?? []);
    }
}

// Пример использования

// Создаем набор документов
const documents: Doc[] = [
    { id: "1", text: "The quick brown fox jumps over the lazy dog" },
    { id: "2", text: "Never jump over the lazy dog quickly" },
    { id: "3", text: "Brown foxes are quick and clever" }
];

// Создаем экземпляр инвертированного индекса
const index = new InvertedIndex();

// Добавляем документы в индекс
documents.forEach(doc => index.addDoc(doc));

// Выполняем поиск по слову "quick" и "brown"
console.log("Search results for 'quick':", index.search("quick"));
console.log("Search results for 'brown':", index.search("brown"));
