/* 
Реалізувати простий шаблон проєктування "Фабрика" (Factory), який створює об'єкти різних типів (наприклад, Car і Bike).
Ці об'єкти мають методи ride() та stop(), базовий клас повинен називатися Transport.
*/

class Transport {
    ride() {
        throw new Error("Ride is not implemented");
    }
    stop() {
        throw new Error("Stop is not implemented");
    }
}

class Bike extends Transport {
    constructor() {
        super();
        this.type = 'bike';
    }

    ride() {
        console.log('Bike is riding');
    }

    stop() {
        console.log('Bike stopped');
    }
}

class Car extends Transport {
    constructor() {
        super();
        this.type = 'car';
    }

    ride() {
        console.log('Car is riding');
    }

    stop() {
        console.log('Car stopped');
    }
}

class TransportFactory {
    static createTransport(type) {
        switch(type) {
            case "bike":
                return new Bike();
            case "car":
                return new Car();
            default:
                throw new Error("Uknown type of transport");
        }
    }
}

const bike = TransportFactory.createTransport("bike");
bike.ride();

const car = TransportFactory.createTransport("car");
car.ride();
car.stop();