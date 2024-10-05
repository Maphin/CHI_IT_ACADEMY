// Написати програму, яка виводить числа від 1 до 10, використовуючи цикли for і while.

const outputNumbersWithForLoop = () => {
    for (let i = 1; i <= 10; i++) {
        console.log(i);
    }
}

const outputNumbersWithWhileLoop = () => {
    let i = 1;
    while (i <= 10) {
        console.log(i);
        i++;
    }
}

outputNumbersWithForLoop();
outputNumbersWithWhileLoop();