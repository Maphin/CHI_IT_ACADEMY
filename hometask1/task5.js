// Створіть об'єкт із кількома ключами на ваш розсуд. І наведіть приклади використання keys, hasOwn, values.

const person = {
    firstName: 'David',
    lastName: 'Pozhar',
    age: 19,
    hobbies: ['programming', 'eSport', 'chess', 'gym']
}

console.log(Object.keys(person));
console.log(Object.hasOwn(person, 'hobbies'));
console.log(Object.hasOwn(person, 'languages'));
console.log(Object.values(person));