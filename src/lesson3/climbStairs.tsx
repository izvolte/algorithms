const memoStairs: number[] = []

function climbStairs(n: number): number {
    const fib = (n: number) => {
        if(n <= 3) {
            memoStairs[n] = n
            return memoStairs[n]
        }else{
            memoStairs[n] = memoStairs[n - 1] +  memoStairs[n - 2]
        }

        return memoStairs[n]
    }

    for (let i = 1; i <= n + 1; i++){
        fib(i)
    }

    return memoStairs[n]
};



// Оптимизируем по пмяти?