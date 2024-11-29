import {Deque} from "./deque";

function personIsSeller(name: string): boolean {
    return name.endsWith("m");
}

const graph: Record<string, string[]> = {
    you: ["alice", "bob", "claire"],
    bob: ["anuj", "peggy"],
    alice: ["peggy"],
    claire: ["thom", "jonny"],
    anuj: [],
    peggy: [],
    thom: [],
    jonny: [],
};

function search(deque: Deque<string>): boolean {
    const searched = new Set<string>();

    while (!deque.isEmpty()) {
        const person = deque.get();

        if (!searched.has(person)) {
            if (personIsSeller(person)) {
                console.log(`${person} is a mango seller!`);
                return true;
            } else {
                graph[person]?.forEach(friend => deque.add(friend));
                searched.add(person);
            }
        }
    }

    return false;
}

const searchQueue = new Deque<string>();
graph["you"].forEach(person => searchQueue.add(person));

search(searchQueue);
