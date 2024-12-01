import {Deque} from "./deque";

function personIsSeller(name: string): boolean {
    return name.endsWith("123");
}

const graph: Record<string, string[]> = {
    you: ["Alice", "Bob", "Claire"],
    Bob: ["Anuj", "Peggy"],
    Alice: ["Peggy"],
    Claire: ["Thom", "Jonny"],
    Anuj: [],
    Peggy: [],
    Thom: [],
    Jonny: [],
};

function search(deque: Deque<string>): boolean {
    const searched = new Set<string>();

    while (!deque.isEmpty()) {
        const person = deque.get();

        if (!searched.has(person)) {
            searched.add(person);
            if (personIsSeller(person)) {
                console.log(`${person} is a mango seller!`);
                return true;
            } else {
                graph[person]?.forEach(friend => deque.add(friend));
            }
        }
    }


    console.log(`Mango seller not found!`);
    return false;
}

const searchQueue = new Deque<string>();
graph["you"].forEach(person => searchQueue.add(person));

search(searchQueue);
