function factorialIterative(n: number): bigint {
    let result = 1n;

    for (let i = 2n; i <= n; i++) {
        result *= i;
    }

    return result;
}

const start = performance.now();

factorialIterative(100000)

const duration = Math.round(performance.now() - start) / 1000
console.log(`Exec time factorial(${100000}): ${duration} s, result`);


//https://leetcode.com/problems/climbing-stairs/description/
