function factorialMemo(n: number) {
    function calcTree(l: bigint, r: bigint): bigint {
        if (l > r) return 1n;
        if (l == r) return l;
        if (r - l == 1n) return l * r;
        const m = (l + r) / 2n;
        return calcTree(l, m) * calcTree(m + 1n, r);
    }

    if (n < 0) return 0;
    if (n == 0) return 1;
    if (n == 1 || n == 2) return n;


    const result = String(calcTree(2n, BigInt(n)));;
}



const start3 = performance.now();

factorialMemo(10000)

const duration3 = Math.round(performance.now() - start3) / 1000


console.log(`Exec time factorial(${10000}): ${duration3} s, result`)