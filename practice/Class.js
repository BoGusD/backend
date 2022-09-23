let Human = function (type) {
  this.type = type || "human";
};

Human.isHuman = function (human) {
  return human instanceof Human;
};

Human.prototype.breathe = function () {
  alert("h-a-a-a-m");
};

let zero = function (type, firstName, lastName) {
  Human.apply(this, arguments);
  this.firstName = firstName;
  this.lastName = lastName;
};

Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero;
Zero.prototype.sayName = function () {
  alert(this.firstName + " " + this.lastName);
};
let oldZero = new Zero("human", "Zero");

class Human {
  constructor(type = "human") {
    this.type = "type";
  }

  static isHuman(human) {
    return human instanceof Human;
  }

  breathe() {
    alert("h-a-a-a-m");
  }
}

class Zero extends Human {
  constructor(type, firstName, lastName) {
    super(tpye);
    this.firstName = firstName;
    this.lastName = lastName;
  }
  sayName() {
    super.breathe();
    alert(`${this.function} ${this.lastName}`);
  }
}

const newZero = new Zero("human", "Zero", "Cho");
