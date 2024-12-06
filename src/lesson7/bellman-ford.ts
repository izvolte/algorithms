import {Costs, graph, Graph, Parents} from "./dijkstra";

function bellmanFord(graph: Graph, start: string): { costs: Costs; parents: Parents } {
    const costs: Costs = {};
    const parents: Parents = {};
    const nodes = Object.keys(graph);

    // Инициализация стоимости и родителей
    for (const node of nodes) {
        costs[node] = node === start ? 0 : Infinity;
        parents[node] = null;
    }

    // Проход по всем рёбрам |V| - 1 раз
    for (let i = 0; i < nodes.length - 1; i++) {
        for (const node of nodes) {
            for (const neighbor in graph[node]) {
                const newCost = costs[node] + graph[node][neighbor];
                if (newCost < costs[neighbor]) {
                    costs[neighbor] = newCost;
                    parents[neighbor] = node;
                }
            }
        }
    }

    return { costs, parents };
}

const result = bellmanFord(graph, "start");

console.log('-------- Bellman-Ford --------')

console.log("Costs:", result.costs);
console.log("Parents:", result.parents);

console.log('------------------------------')
