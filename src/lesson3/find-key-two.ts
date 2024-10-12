interface Key {
    isKey(): this is Key;
    isBox(): this is Box;
}

interface Box {
    [Symbol.iterator]: () => {
        next(): { done: boolean; value: Key | Box };
    };
    isKey(): this is Key;
    isBox(): this is Box;
}

function _lookForKey2(box: Box): void {
    for (let item of box) {
        if (item.isBox()) {
            _lookForKey2(item);
        } else if (item.isKey()) {
            console.log("Found the key!");
            return;
        }
    }
}

// O(n)
