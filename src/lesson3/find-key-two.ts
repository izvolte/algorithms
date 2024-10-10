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

function _lookForKey(box: Box): void {
    for (let item of box) {
        if (item.isBox()) {
            _lookForKey(item);
        } else if (item.isKey()) {
            console.log("Found the key!");
            return;
        }
    }
}
