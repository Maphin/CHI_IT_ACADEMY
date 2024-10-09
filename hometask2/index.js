/*
Створити функцію, яка при створенні приймає об'єкт, наприклад: {access-token: 'qwerty'} і додає його до кожної структури даних, що буде передана в результатуючу функцію. 
Також до об'єкта буде додано поле count. При кожному виклику воно має збільшуватися на 1.
*/

function addParamsToRequest(obj) {
    let counter = 0;
    return function(data) {
        counter++;
        return {
            ...obj,
            data,
            counter
        }
    }
}

const data1 = {
    name: "David",
    age: 19,
    languages: ['en', 'ukr', 'cz']
}
const data2 = [1, 2, 3];
const data3 = 'string';

const sendData = addParamsToRequest({access_token: 'qwerty'});
const result = sendData(data1);
const result1 = sendData(data2);
const result2 = sendData(data3);

console.log(result, result1, result2);


/*
У вас є об'єкт:

const obj = {
    getData: function () {
        console.log(Person name is: ${this.name} and age ${this.age})
    }
}

Викличте його так, щоб ім'я та вік були вказані (значення неважливі). Потім створіть функцію, яка буде це робити постійно при її виклику.
*/

const obj = {
    getData: function () {
        console.log(`Person name is: ${this.name} and age ${this.age}`)
    }
}

const person = {
    name: "David",
    age: 19
}

obj.getData.call(person);

const getPersonData = obj.getData.bind(person);
getPersonData();

/* 
У вас є об'єкт:

const root = {
  name: "name",
  type: "folder",
  children: [
    {
      name: "folder 1",
      type: "folder",
      children: [
        {
          name: "folder 2",
          type: "folder",
          children: [
            {
              name: "file 3",
              type: "file",
              size: 30,
            },
          ],
        },
      ],
    },
    {
      name: "file 1",
      type: "file",
      size: 10,
    },
    {
      name: "file 2",
      type: "file",
      size: 20,
    },
  ],
};

Задача — пройтися по об'єкту рекурсивно, знайти всі файли та повернути їхні імена у вигляді масиву.
*/

const root = {
    name: "name",
    type: "folder",
    children: [
      {
        name: "folder 1",
        type: "folder",
        children: [
          {
            name: "folder 2",
            type: "folder",
            children: [
              {
                name: "file 3",
                type: "file",
                size: 30,
              },
            ],
          },
        ],
      },
      {
        name: "file 1",
        type: "file",
        size: 10,
      },
      {
        name: "file 2",
        type: "file",
        size: 20,
      },
    ],
};

const getFilesNames = (obj, filesNames = []) => {
    if (obj.type === "file") {
        filesNames.push(obj.name);
    } else {
        obj.children.forEach(child => getFilesNames(child, filesNames));
    }

    return filesNames;
}

/* 
Створіть базовий об'єкт Людина з такими властивостями:
- name
- phone

Метод introduce, який виводить у консоль фразу: Привіт, мене звати {name}, мій номер {phone}.

Створіть об'єкти Студент і Викладач, які будуть наслідувати властивості та методи від об'єкта Людина.

- Для Студента додайте додаткову властивість course (курс) і метод study, який виводить: Я навчаюся на {course} курсі.
- Для Викладача додайте додаткову властивість subject (предмет) і метод teach, який виводить: Я викладаю {subject}.

Реалізуйте наслідування за допомогою конструктора функції або класів (оберіть один підхід).
*/

// ES6(class) implementation
class Person {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }

    introduce() {
        console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}`);
    }
}

class Student extends Person {
    constructor(name, phone, course) {
        super(name, phone);
        this.course = course;
    }

    study() {
        console.log(`Я навчаюся на ${this.course} курсі`);
    }
}

class Teacher extends Person {
    constructor(name, phone, subject) {
        super(name, phone);
        this.subject = subject;
    }

    teach() {
        console.log(`Я викладаю ${this.subject}`);
    }
}

const student = new Student("David", "+3805000000", 3);
const teacher = new Teacher("Kseniia", "+3807000000", "Math");

student.introduce();
student.study();

teacher.introduce();
teacher.teach();


// ES5(prototype) implementation
function PersonOldStyle(name, phone) {
    this.name = name;
    this.phone = phone;
}

PersonOldStyle.prototype.introduce = function() {
    console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}`);
}

function StudentOldStyle(name, phone, course) {
    PersonOldStyle.call(this, name, phone);
    this.course = course;
}
function TeacherOldStyle(name, phone, subject) {
    PersonOldStyle.call(this, name, phone);
    this.subject = subject;
}

StudentOldStyle.prototype = Object.create(PersonOldStyle.prototype);
TeacherOldStyle.prototype = Object.create(PersonOldStyle.prototype);
StudentOldStyle.prototype.constructor = StudentOldStyle;
TeacherOldStyle.prototype.constructor = StudentOldStyle;

StudentOldStyle.prototype.study = function() {
    console.log(`Я навчаюся на ${this.course} курсі`);
}
TeacherOldStyle.prototype.teach = function() {
    console.log(`Я викладаю ${this.subject}`);
}

const studentOldStyle = new StudentOldStyle("David", "+3805000000", 3);
const teacherOldStyle = new TeacherOldStyle("Kseniia", "+3807000000", "Math");

studentOldStyle.introduce();
studentOldStyle.study();

teacherOldStyle.introduce();
teacherOldStyle.teach();