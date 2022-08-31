// // //@ts-check

// const { getTypeParameterOwner } = require("typescript");

// // //function 활용
// // // function Car(brand, color) {
// // //     this.brand =brand;
// // //     this.color =color;
// // //     this.drive=function(){
// // //         console.log(`${this.brand}의 ${this.color}색 자동차가 `);
// // //     }
// // // }
// // // const hyundai = new Car('hyundai', 'blue');
// // // const porsche = new Car('porsche', 'black');
// // // const toyota = new Car('toyota', 'silver');

// // // console.log(hyundai.brand, hyundai.color);
// // // porsche.drive();
// // // toyota.drive();




// // // class 활용
// // class Car {
// //     constructor(brand, color) {
// //     this.brand =brand;
// //     this.color=color;
// //     }

// //     drive() {
// //         console.log(`${this.brand}의 ${this.color}색 자동차가 주행중입니다.`);
// //     }
// //     showSpec(){
// //         console.log(`이 차의 브랜드는 ${this.brand}이고, 색상은 ${this.color} 입니다.`);
// //     }
// // }
// // // extends와 super를 활용(상속)
// // class ElecCar extends Car {
// //     constructor(brand, color, fuel) {
// //         super(brand, color);
// //         this.fuel =fuel;
// //     }
// //     // showFuel() {
// //     //     console.log(`해당 자동차는 ${this.fuel}의 힘으로 주행합니다.`)
// //     // }
// //     drive(){
// //         console.log(`${this.brand}의 ${this.color}색 자동차가 ${this.fuel}의 힘으로 주행중입니다.`);
// //     }

// //     showSpec() {
// //         super.showSpec();
// //         console.log(`그리고 이 차는 ${super.brand} ${this.fuel} 힘으로 주행합니다.`);

// //     }
// // }

// // const hyundai = new Car('hyundai', 'blue');
// // // hyundai.showSpec();


// // // const porsche = new Car('porsche', 'black');
// // // const toyota = new Car('toyota', 'silver');

// // const tesla = new ElecCar('tesla', 'white', 'eletricity');
// // // tesla.showSpec();
// // console.log(hyundai instanceof Car);
// // console.log(tesla instanceof Car);

// // // console.log(tesla.brand, tesla.color, tesla.fuel);
// // // tesla.showFuel();

// // // console.log(hyundai.brand, hyundai.color);
// // // porsche.drive();
// // // toyota.drive();






// // // let userId = '';

// // // const promise = new Promise((resolve, reject) =>{
// // //     console.log('프로미스 내부의 코드는 바로 실행 됩니다');
// // //     setTimeout(()=>{
        
       
// // //         if(userId === 'bogus'){
// // //             resolve(userId);
// // //         }else{
// // //             reject(new Error('서버 통신이 원할하지 않습니다.'));
// // //         }
// // //     }, 2000);
// // // });

// // // promise
// // //     .then((value) =>{
// // //     console.log(`요청하신 id는 ${value}입니다.`);
// // //     })
// // //     .catch((err) => {
// // //     console.log(err);
// // //     })
// // //     .finally(() => {
// // //     console.log('프로미스 시퀀스가 끝났습니다.');
// // //     });
    
// // // console.log('1');
// // // setTimeout(()=> {
// // //     console.log('callback');
// // // }, 1000);
// // // console.log('2');
// // //  */
// // // //disable esint


// // // //callback 코드가 없으면 id를 정확하게 입력해도 로그인실패로 응답됨
// // // let id = prompt ('아이디를 입력하세요!');
// // // let userId = '';

// // // console.log('로그인 시도');
// // // setTimeout(function cb1(){
// // //     userId='bogus';
// // //     console.log('아이디 정보 획득 완료!');


// // // if(id ===userId) {
// // //     console.log('로그인 성공');  
// // // } else{
// // //     console.log('로그인 실패');
// // // }
// // // }, 2000);  

// //es5 버전
// // function Car(brand, color) {
// //      this.brand = brand;
// //      this.color = color;
// //      this.drive = function () {
// //       console.log(`${this.brand}의 ${this.color}색 자동차가 주행 중입니다`);
// //      };
// //     }
// //     function ElecCar(brand, color, fuel) {
// //      // Car 생성자 함수의 this 와 생성자를 가져오기 위한 call 메소드 사용
// //      Car.call(this, brand, color);
// //      this.fuel = fuel;
// //      // 오버라이딩 구현
// //      this.drive = function () {
// //       console.log(
// //        `${brand}의 ${color}색 자동차가 ${this.fuel}의 힘으로 주행 중입니다`
// //       );
// //      };
// //     }
// //     // 상속 받을 ElecCar 의 프로토 타입을 Object 객체(최상위 개념)를 사용해서 Car 의 프로토 타입과 동일하게 만들어 낸다.
// //     ElecCar.prototype = Object.create(Car.prototype);
// //     // 상속 받을 ElelCar 의 생성자는 위에서 선언한 생성자 함수의 것을 따르도록 설정
// //     ElecCar.prototype.constructor = ElecCar;
// //     const tesla = new ElecCar('tesla', 'white', 'electricity');
// //     tesla.drive();
    

//     class Shape{
//     constructor(width,height){
//         this.width=width;
//         this.height=height;
//     }
 
//     getArea(){
//         return this.width * this.height;
//     };
// }
        
//     class Rectangle extends Shape{
//         constructor(width, height){
//         super(width, height);
//         }
//     } 
//     class Triangle extends Shape{
//         constructor(width, height){
//         super(width, height);
//         }
    
//     getArea(){
//         return this.width * this.height / 2;
//     };
// }
    
//     class Circle extends Shape{
//         constructor(width, height, radius){
//         super(width, height);
//         this.radius=radius;
//         }
    
//     getArea(){
//         return 3.14 *this.radius **2;
//     }
// }

//     const shape = new Shape(5, 5);
//     const rectangle = new Rectangle(4, 4);
//     const triangle = new Triangle(4, 4);
//     const circle = new Circle(4, 4);
//     console.log(
//         shape.getArea(),
//         rectangle.getArea(),
//         );

   
