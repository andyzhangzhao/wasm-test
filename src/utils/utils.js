function _fibonacci(n) {
    if (n === 1 || n === 2) {
        return 1;
    } else {
        return _fibonacci(n - 1) + _fibonacci(n - 2)
    }
}

function run_fibonacci(iter, len) {
    let total = 0;
    for (let i = 0; i < iter; i++) {
        total = 0;
        for (let j = 1; j < len; j++) {
            total = total + _fibonacci(j);
        }
    }
    return total;
}

export { run_fibonacci };
