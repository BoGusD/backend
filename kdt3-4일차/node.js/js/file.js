// @ts-check









/** promise */

// const promise = new Promise((resolve, reject) => {
//  const bogus = 'trash';
//  if(bogus === 'trash'){
//     setTimeout(()  =>{
//         // console.log(promise);
//         resolve('강지훈 is trash');

//     }, 2000);
//  }else {
//     reject('bogus is getting young');
//  }
// });

// promise.then( (data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// })





const fs = require('fs').promises;

async function main() {
    let data = await fs.readFile('readme.txt', 'utf-8');
    console.log('1번', data);
    data = await fs.readFile('readme.txt', 'utf-8');
    console.log('2번', data);
    data = await fs.readFile('readme.txt', 'utf-8');
    console.log('3번', data);
    data = await fs.readFile('readme.txt', 'utf-8');
    console.log('4번', data);
}
main();

/** callback sync */
// const fs = require('fs');

// let data = fs.readFileSync('readme.txt', 'utf-8');
// console.log('1번', data);
// data = fs.readFileSync('readme.txt', 'utf-8');
// console.log('2번', data);
// data = fs.readFileSync('readme.txt', 'utf-8');
// console.log('3번', data);
// data = fs.readFileSync('readme.txt', 'utf-8');
// console.log('4번', data);


// callback 지옥

// fs.readFile('readme.txt', 'utf-8').then((data) => {
//     console.log('1번', data);
//     return fs.readFile('readme.txt', 'utf-8');
// }).then((data) => {
//     console.log('2번', data);
//     return fs.readFile('readme.txt', 'utf-8');
// }).then(function(data) {
//     console.log('3번', data);
//     return fs.readFile('readme.txt', 'utf-8');
// }).then(function(data) {
//     console.log('4번', data);
//     return fs.readFile('readme.txt', 'utf-8');
// }).catch((err) =>{
//     console.log(err);
// })


// fs.readFile('readme.txt', 'utf-8', (err, data) => {
//     if (err){
//         throw err;            //예외 처리 throw
//     }
//     console.log('1번 강지훈', data.toString);

//     fs.readFile('readme.txt', 'utf-8', (err, data) => {
//         if (err){
//             throw err;            //예외 처리 throw
//         }
//         console.log('2번 강지훈', data.toString);

//         fs.readFile('readme.txt', 'utf-8', (err, data) => {
//             if (err){
//                 throw err;            //예외 처리 throw
//             }
//             console.log('3번 강지훈', data.toString);

//             fs.readFile('readme.txt', 'utf-8', (err, data) => {
//                 if (err){
//                     throw err;            //예외 처리 throw
//                 }
//                 console.log('4번 강지훈', data.toString);
//             })

//         })

//     })
// })

// const str = ' 파일 쓰기가 정상적으로 수행이 되면 이 문구가 파일에 들어갑니다';

// fs.writeFile('readme.txt', str, 'utf-8', (err) => {
//     if(err) {
//         console.log(err);
//     }else{
//         console.log('writeFile succeed');
//     }
// })

// fs.readFile('readme.txt', 'utf-8', (err, data)  => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

