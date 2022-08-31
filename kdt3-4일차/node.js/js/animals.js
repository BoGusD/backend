// @ts-check

export default class Animal {
    constructor(){
        this.animals = ['모승환', '강지훈'];

    }

    showAnimals() {
        this.animals.map((el) => console.log(el));
    }
}
