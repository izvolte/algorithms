interface Key {
    isKey(): this is Key;
    isBox(): this is Box;
}

interface Box {
    [Symbol.iterator]: () => {
        next(): { done: boolean; value: Key | Box };
    };
    makeAPileToLookThrough(): Box[];
    isKey(): this is Key;
    isBox(): this is Box;
}

function _lookForKey(mainBox: Box): void {
    let pile: Box[] = mainBox.makeAPileToLookThrough();

    while (pile.length > 0) {
        let box = pile.pop();

        if (box) {
            for (let item of box) {
                if (item.isBox()) {
                    pile.push(item);
                } else if (item.isKey()) {
                    console.log("Found the key!");
                    return;
                }
            }
        }
    }
}
