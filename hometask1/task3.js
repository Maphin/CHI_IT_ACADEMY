/*
Створити масив об'єктів (приклад об'єкта {name: ‘’, age: xx, pets: [cat, dog]}) і використати метод filter, щоб вивести всіх, кому більше 20 років.  
За допомогою map пройтися по масиву із завдання вище та додати кожному домашню тварину. Результат вивести у консоль.  
*/

const peopleArray = [
    {
        name: 'David',
        age: 19,
        pets: ['dog', 'snake']
    },
    {
        name: 'Olena',
        age: 35,
        pets: ['cat', 'dog', 'squirrel']
    },
    {
        name: 'Mariia',
        age: 17,
        pets: ['hamster', 'snail', 'rabbit']
    },
    {
        name: 'John',
        age: 25,
        pets: ['goldfish', 'tortoise']
    },
    {
        name: 'Denis',
        age: 15,
        pets: ['dog']
    },
    {
        name: 'Igor',
        age: 45,
        pets: ['chameleon', 'cat', 'canary', 'parrot']
    },
]

const filterPeopleByAge = (people, age) => {
    return people.filter(person => person.age > age);
}

console.log(filterPeopleByAge(peopleArray, 20));

const addPetToEachPerson = (people) => {
    return people.map(person => person.pets.push('minipig'));
}

addPetToEachPerson();

console.log(peopleArray);