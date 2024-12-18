type Stations = Record<string, Set<string>>


function findStations(stations: Stations, statesNeeded: Set<string>): Set<string> {
    const finalStations = new Set<string>();

    while (statesNeeded.size > 0) {
        const stationsEntries = Object.entries(stations)

        let bestStation = null;
        let statesCovered = new Set<string>();

        for (const [station, states] of stationsEntries) {
            const covered = new Set<string>();

            for(const state of states){
                if(statesNeeded.has(state)) covered.add(state)
            }


            if (covered.size > statesCovered.size) {
                bestStation = station;
                statesCovered = covered;
            }
        }

        for(const stateCovered of statesCovered) {
            statesNeeded.delete(stateCovered)
        }

        if (bestStation) finalStations.add(bestStation);
    }

    return finalStations
}

const statesNeeded = new Set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"]);
const stations: Stations = {};

stations["kone"] = new Set(["id", "nv", "ut"]);
stations["ktwo"] = new Set(["wa", "id", "mt"]);
stations["kthree"] = new Set(["or", "nv", "ca"]);
stations["kfour"] = new Set(["nv", "ut"]);
stations["kfive"] = new Set(["ca", "az"]);

const finalStations = findStations(stations, statesNeeded)

console.log(finalStations);
