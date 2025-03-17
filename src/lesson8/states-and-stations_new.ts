type Stations2 = Record<string, Set<string>>;

function findStations2(stations: Stations2, statesNeeded: Set<string>): Set<string> {
    const finalStations = new Set<string>();

    while (statesNeeded.size > 0) {
        const stationsEntries = Object.entries(stations)

        let bestStation = null;
        let statesCovered = new Set<string>();

        for (const [station, states] of stationsEntries) {
            // Новый метод intersection возвращает множество пересечения двух Set
            const covered = states.intersection(statesNeeded);

            if (covered.size > statesCovered.size) {
                bestStation = station;
                statesCovered = covered;
            }
        }

        // Новый метод difference возвращает множество без элементов statesCovered
        statesNeeded = statesNeeded.difference(statesCovered);

        if (bestStation) {
            finalStations.add(bestStation);
        }
    }

    return finalStations;
}

const statesNeeded2 = new Set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"]);
const stations2: Stations2 = {
    "kone": new Set(["id", "nv", "ut"]),
    "ktwo": new Set(["wa", "id", "mt"]),
    "kthree": new Set(["or", "nv", "ca"]),
    "kfour": new Set(["nv", "ut"]),
    "kfive": new Set(["ca", "az"])
};

const finalStations2 = findStations2(stations2, statesNeeded2);
console.log(finalStations2);
