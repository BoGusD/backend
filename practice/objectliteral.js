let sayNode = function() {
    console.log('Node');
};
let es = 'ES';
let oldObject = {
    sayJS: function() {
        console.log('JS');
    },
    sayNode: sayNode,
}
oldObject[es + 6 ] = 'Fantatstic';
oldObject.sayNode();
oldObject.sayJS();
console.log(oldObject.ES6);

const newObject = {
    sayJS() {
        console.log('JS');
    },
// sayNode처럼 속성명과 변수명이 동리한 경우네는 한 번만 써도 되게 바뀌었다.
    sayNode,
    [es +6 ]: 'Fanatatstic',
};
newObject.sayNode();
newObject.sayJS();
console.log(newObject.ES6);