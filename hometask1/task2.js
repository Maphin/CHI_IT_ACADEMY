/*
Створити масив, що складається з елементів різних типів (примітивів) (число, рядок, булева змінна) довжиною 10 елементів. 
Вивести їх тип за допомогою typeof у консоль. Виведення здійсніть за допомогою перебору масиву різними способами: методом forEach, циклами for, while і do while.
*/  

const primitivesArray = [10, 'JavaScript', true, 50, 'Java', false, 70, 'Python', false, 90];

const outputPrimitivesWithForEachLoop = (array) => {
    array.forEach(value => console.log(typeof value));
}

const outputPrimitivesWithForLoop = (array) => {
    for (let i = 0; i < array.length; i++) {
        console.log(typeof array[i]);
    }
}

const outputPrimitivesWithWhileLoop = (array) => {
    let i = 0;
    while (i < array.length) {
        console.log(typeof array[i]);
        i++;
    }
}

const outputPrimitivesWithDoWhileLoop = (array) => {
    let i = 0;
    do {
        console.log(typeof array[i]);
        i++;
    } while (i < array.length);
}

outputPrimitivesWithForEachLoop(primitivesArray);
outputPrimitivesWithForLoop(primitivesArray);
outputPrimitivesWithWhileLoop(primitivesArray);
outputPrimitivesWithDoWhileLoop(primitivesArray);