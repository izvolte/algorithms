export type Graph = {
    [node: string]: { [neighbor: string]: number };
};

export type Costs = { [node: string]: number };
export type Parents = { [node: string]: string | null };


export const graph: Graph = {
    start: { a: 6, b: 2 },
    a: { fin: 1 }, // b
    b: { a: 3, fin: 5 },
    fin: {}
};

function findLowestCostNode(costs: Costs, processed: Set<string>): string | null {
    let lowestCost = Infinity;
    let lowestCostNode: string | null = null;

    for (const node in costs) {
        const cost = costs[node];
        if (cost < lowestCost && !processed.has(node)) {
            lowestCost = cost;
            lowestCostNode = node;
        }
    }

    return lowestCostNode;
}

function dijkstra(graph: Graph, start: string): { costs: Costs; parents: Parents } {
    const costs: Costs = {};
    const parents: Parents = {};
    const processed = new Set<string>();

    // Initialize costs and parents
    for (const node in graph) {
        if (node === start) {
            costs[node] = 0;
        } else {
            costs[node] = Infinity;
        }
        parents[node] = null;
    }

    let node = findLowestCostNode(costs, processed);

    while (node !== null) {
        const cost = costs[node];
        const neighbors = graph[node];

        for (const neighbor in neighbors) {
            const newCost = cost + neighbors[neighbor];
            if (newCost < costs[neighbor]) {
                costs[neighbor] = newCost;
                parents[neighbor] = node;
            }
        }

        processed.add(node);
        node = findLowestCostNode(costs, processed);
    }

    return { costs, parents };
}

const { costs, parents } = dijkstra(graph, "start");


console.log('-------- Dijkstra --------')

console.log("Costs:", costs);
console.log("Parents:", parents);

console.log('-------------------------')