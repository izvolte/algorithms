const memo: { [key: number]: bigint } = { 0: 1n, 1: 1n };

function factorialIterativeMemoized(n: number): bigint {
    const factorial = (n: number) => {
        if (memo[n]) return memo[n];
        memo[n] = memo[n - 1] * BigInt(n);
        return memo[n];
    };

    for (let i = 2; i <= n; i++) {
        factorial(i);
    }

    return memo[n];
}

let start2 = performance.now();

factorialIterativeMemoized(10000)

let duration2 = Math.round(performance.now() - start2) / 1000
console.log(`Exec time factorial(${10000}): ${duration2} s, result`);


start2 = performance.now();

factorialIterativeMemoized(10000)

duration2 = Math.round(performance.now() - start2) / 1000
console.log(`Exec time factorial(${10000}): ${duration2} s, result`);